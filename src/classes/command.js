class Command {
  constructor(subject) {
    this.subject = subject;
  }

  execute(command) {
    return this.subject[command]();
  }
}

export default Command;
