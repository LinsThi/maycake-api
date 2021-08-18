import { EntityRepository, Repository } from 'typeorm';
import Address from '../entities/Address';

@EntityRepository(Address)
export default class AddressRepository extends Repository<Address> {}
