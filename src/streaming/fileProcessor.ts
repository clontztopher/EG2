import { parse, unparse } from 'papaparse';
// @ts-ignore
import streamSaver from 'streamsaver';
import { IProcessorOptions } from '../types';
import chunkProcessor from './chunkProcessor';

function fileProcessor(srcFile: File, opts: IProcessorOptions) {
  const downStream: WritableStream = streamSaver.createWriteStream(
    'testOne.csv'
  );
  const streamWriter = downStream.getWriter();
  const textEncoder = new TextEncoder();

  parse(srcFile, {
    error(err) {
      // Log error on reader
      console.error(err);
    },
    async chunk(results, parser) {
      const { data, errors, meta } = results;
      // Pause parser until chunk has
      // been written to stream writer.
      parser.pause();

      // Wait for writer's ready state.
      await streamWriter.ready;

      try {
        const entityArr = chunkProcessor(data, opts); // Process chunk
        const unparsed = unparse(entityArr); // Convert back to csv
        const encoded = textEncoder.encode(unparsed); // Encode csv string
        await streamWriter.write(encoded); // Write to stream
      } catch (e) {
        parser.abort();
        streamWriter.abort();
        console.error(e);
      }
      // Continue parsing
      parser.resume();
    },
    async complete() {
      await streamWriter.ready;
      streamWriter.close();
    }
  });
}

export default fileProcessor;
