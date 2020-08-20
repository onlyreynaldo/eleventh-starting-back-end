"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com'
    });
    expect(updateUser.name).toBe('Jhon Trê');
    expect(updateUser.email).toBe('jhontre@example.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'jhondoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updateUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to user created', async () => {
    await expect(updateProfile.execute({
      user_id: 'not-user-created',
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      old_password: '123456',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});