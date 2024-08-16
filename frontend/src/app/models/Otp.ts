export class Otp {
  send_otp: string;
  mail: string;

  constructor(send_otp?: string, mail?: string) {
    this.send_otp = send_otp;
    this.mail = mail;
  }
}
