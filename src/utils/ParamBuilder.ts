export class ParamBuilder {
  private params: Array<string> = [];

  public addParam(key: string, value: string): ParamBuilder {
    if (
      key !== undefined &&
      key !== null &&
      value !== undefined &&
      value !== null
    ) {
      if (this.params.length == 0) {
        this.params.push(`?${key}=${value}`);
      } else this.params.push(`${key}=${value}`);
    }
    return this;
  }

  public build(): string {
    var paramString = this.params.join("&");
    this.params = [];
    return paramString;
  }
}
