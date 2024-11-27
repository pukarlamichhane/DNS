export enum Questiontype {
  A = 1,
  NS = 2,
}

export enum Questionclass {
  IN = 1,
}

export interface TDNSQuestions {
  name: string;
  type: Questiontype;
  class: number;
}

class DNSQuestion {
  static write(questions: TDNSQuestions[]) {
    return Buffer.concat(
      questions.map((question) => {
        const nameBuffer = this.encodeName(question.name);
        const typeBuffer = Buffer.alloc(2);
        typeBuffer.writeInt16BE(question.class, 0);
        return Buffer.concat([nameBuffer, typeBuffer, classBuffer]);
      })
    );
  }

  private static encodeName(name: string) {
    const labels = name.split(".");
    const buffers = labels.map((label) => {
      const lenght = Buffer.alloc(1);
      lenght.writeUInt8(label.length, 0);
      const labelBuffer = Buffer.from(label, "ascii");
      return Buffer.concat([lenght, labelBuffer]);
    });
    return Buffer.concat([...buffers, Buffer.alloc(1)]);
  }
}

export default DNSQuestion;
