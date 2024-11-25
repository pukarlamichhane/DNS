export enum Opcode {
  Standard_Query = 0,
}

export enum ResponseCode {
  NoError = 0, // No error condition
  FormatError = 1, // Format error - The name server was unable to interpret the query
}

export interface TDNSHeader {
  id: number;
  qr: number;
  opcode: Opcode;
  aa: number;
  tc: number;
  rd: number;
  ra: number;
  z: number;
  rcode: number;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;
}

class DNSHeader {
  static write(values: TDNSHeader) {
    const header = Buffer.alloc(12);
    header.writeInt16BE(values.id, 0);
    const flags =
      values.qr |
      values.opcode |
      values.aa |
      values.tc |
      values.rd |
      values.ra |
      values.z |
      values.rcode;
    header.writeInt16BE(flags, 2);
    header.writeInt16BE(values.qdcount, 4);
    header.writeInt16BE(values.ancount, 6);
    header.writeInt16BE(values.nscount, 8);
    header.writeInt16BE(values.arcount, 10);
    return header;
  }
}

export default DNSHeader;
