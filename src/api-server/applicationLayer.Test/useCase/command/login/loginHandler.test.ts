import { IJwTokenHelper } from "../../../../../lib/jwTokenLib/interfaces/IJwTokenHelper";
import { IPublisher } from "../../../../../lib/mediatorLib/interfaces/IPublisher";
import { IUserRepository } from "../../../../applicationLayer/persistence/IUserRepository";
import { LoginFailError } from "../../../../applicationLayer/useCase/command/login/loginFailError";
import { LoginHandler } from "../../../../applicationLayer/useCase/command/login/loginHandler";

let mockUserRepository: IUserRepository;
let mockPublisher: IPublisher;
let mockJwTokenHelper: IJwTokenHelper;

describe("LoginHandler", () => {
  mockPublisher.publish = jest.fn();

  beforeEach(() => {
    mockUserRepository = {} as IUserRepository;
    mockJwTokenHelper = {} as IJwTokenHelper;
  });

  test("when user is not found, should return LoginFailError", async () => {});
});
