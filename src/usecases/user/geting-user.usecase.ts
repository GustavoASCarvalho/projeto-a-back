import { UserRepository } from '../../repositories/interfaces/user.interface';

export class GetingUser {
	constructor(private userRepository: UserRepository) {}

	async execute(id: number) {
		const user = await this.userRepository.findById(id);
		const userWithoutPassword = { ...user };
		delete userWithoutPassword.password_hash;

		return userWithoutPassword;
	}
}
