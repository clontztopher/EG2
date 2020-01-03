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
      parser.pause();
      await streamWriter.ready;
      // Process chunk
      try {
        // Process chunk
        const entityArr = chunkProcessor(data, opts);
        // Convert back to csv
        const unparsed = unparse(entityArr);
        // Encode csv string
        const encoded = textEncoder.encode(unparsed);
        // Write to stream
        await streamWriter.write(encoded);
        // Continue parsing
        parser.resume();
      } catch (e) {
        parser.abort();
        streamWriter.abort();
        console.error(e);
      }
    },
    async complete() {
      await streamWriter.ready;
      streamWriter.close();
    }
  });
}

export default fileProcessor;
