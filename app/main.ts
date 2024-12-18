import * as dgram from "dgram";
import DNSHeader, { Opcode, ResponseCode, type TDNSHeader } from "./DNS/header";
import DNSQuestion, {
  Questionclass,
  Questiontype,
  type TDNSQuestions,
} from "./DNS/question";

export const defaultHeaders: TDNSHeader = {
  id: 1234, // Default ID, should be overridden
  qr: 1 << 15, // Query (not a response)
  opcode: Opcode.Standard_Query,
  aa: 0, // Not authoritative
  tc: 0, // Not truncated
  rd: 0, // Recursion desired
  ra: 0, // Recursion not available by default
  z: 0, // Reserved bits
  rcode: ResponseCode.NoError,
  qdcount: 0,
  ancount: 0,
  nscount: 0,
  arcount: 0,
};

export const defaultQuestions: TDNSQuestions = {
  name: "codecrafters.io",
  class: Questionclass.IN,
  type: Questiontype.A,
};
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");
//
udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
  try {
    console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
    const header = DNSHeader.write({ ...defaultHeaders, qdcount: 1 });
    const questions = DNSQuestion.write([defaultQuestions]);

    const response = Buffer.concat([header, questions]);
    udpSocket.send(response, remoteAddr.port, remoteAddr.address);
  } catch (e) {
    console.log(`Error sending data: ${e}`);
  }
});
