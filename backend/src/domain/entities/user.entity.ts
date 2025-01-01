export class User {
  public id?: string;
  public username: string;

  constructor(user: { id?: string; username: string }) {
    this.id = user.id;
    this.username = user.username;
  }
}
