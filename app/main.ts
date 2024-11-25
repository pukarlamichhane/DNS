import * as dgram from "dgram";
import DNSHeader, { Opcode, ResponseCode, type TDNSHeader } from "./DNS/header";

export const defaultHeaders: TDNSHeader = {
  id: 1234, // Default ID, should be overridden
  qr: 0, // Query (not a response)
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
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
//
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");
//
udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
  try {
    const header = DNSHeader.write(defaultHeaders);
    console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
    const response = Buffer.concat([header]);
    udpSocket.send(response, remoteAddr.port, remoteAddr.address);
  } catch (e) {
    console.log(`Error sending data: ${e}`);
  }
});
