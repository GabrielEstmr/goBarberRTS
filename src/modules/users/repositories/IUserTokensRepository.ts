import UserToken from '../infra/typeorm/entities/UserToken';//IMportando campos;entidades

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}