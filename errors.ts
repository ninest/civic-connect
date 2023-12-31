/**
 * Custom Error type that has a status code and a message (from the default Error class)
 */
export class HttpException extends Error {
  public status: number;

  /**
   * Constructs an error with a status and message.
   * @param status the status code of the error (e.g., 400, 404, 403)
   * @param message the message to send with the error
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type ObjectNames = "Bot" | "Category" | "Document" | "Message" | "Form" | "FormFields" | "FormSubmission";
export class NotFoundException extends HttpException {
  /**
   * Constructs a not found error
   * @param name the name of the thing that can't be found
   * @param id the id of the thing that can't be found
   */
  constructor(name: ObjectNames, id: number | string) {
    super(404, `${name} with id/slug ${id} not found`);
  }
}

export class InvalidDataException extends HttpException {
  constructor(name: ObjectNames, id: string | number, data: any) {
    super(400, `${name} with id/slug ${id} received invalid data: ${data}`);
  }
}

export class NotAllowedException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
