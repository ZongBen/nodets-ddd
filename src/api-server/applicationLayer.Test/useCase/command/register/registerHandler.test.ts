import { OkResponse } from "../../../../applicationLayer/okResponse";
import { IUserRepository } from "../../../../applicationLayer/persistence/IUserRepository";
import { RegisterHandler } from "../../../../applicationLayer/useCase/command/register/registerHandler";
import { UserExsistError } from "../../../../applicationLayer/useCase/command/register/userExsistError";
import { UserRoot } from "../../../../domainLayer/user/userRoot";

let mockUserRepository: IUserRepository;

describe("registerHandler", () => {
  beforeEach(() => {
    mockUserRepository = {} as IUserRepository;
  });

  test("when user not found then create user", async () => {
    mockUserRepository.getByAccount = jest.fn().mockResolvedValue(null);

    mockUserRepository.create = jest.fn().mockResolvedValue({} as UserRoot);

    const registerHandler = new RegisterHandler(mockUserRepository);
    const result = await registerHandler.handle({
      account: "account",
      password: "password",
      userName: "userName",
    });

    expect(result).toBeInstanceOf(OkResponse);
  });

  test("when user found then return error", async () => {
    mockUserRepository.getByAccount = jest
      .fn(mockUserRepository.getByAccount)
      .mockResolvedValue({} as UserRoot);

    const registerHandler = new RegisterHandler(mockUserRepository);
    const result = await registerHandler.handle({
      account: "account",
      password: "password",
      userName: "userName",
    });

    expect(result).toBeInstanceOf(UserExsistError);
  });
});
