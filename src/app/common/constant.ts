export class Constant {
  public static TOKEN_NAME = 'AUTH_TOKEN';
  public static API_URL = 'https://ng-chat-video.herokuapp.com/';
  public static SOCKET_URL = 'https://ng-chat-video.herokuapp.com/';
  public static EMAIL_REG_EX = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
  public static PASSWORD_REG_EX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z!@#$%^&*?.+-\\d]{8,}$');
}
