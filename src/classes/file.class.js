export class FS_Item {
  constructor(uuid, name, date = null) {
    this.name = name;
    this.uuid = uuid;
    this.date = date;
  }
}
