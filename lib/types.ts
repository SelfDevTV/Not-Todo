export interface IUser {
  name: String;
  email: String;
  id: String;
}

export interface ITodo {
  title: String;
  owner: IUser;
  ownerId: String;
}

export interface ITodos {
  todos: ITodo[];
}
