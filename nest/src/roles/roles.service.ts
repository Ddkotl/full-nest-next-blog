import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleModel.create(createRoleDto);
    return role;
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.roleModel.findAll();
    return roles;
  }

  async findOneById(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException('Такой роли нет');
    }
    return role;
  }
  async findOneByValue(value: string): Promise<Role> {
    if (!value) {
      throw new NotFoundException('Такой роли нет');
    }
    const role = await this.roleModel.findOne({ where: { value: value } });
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOneById(id);
    return role.update(updateRoleDto);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOneById(id);
    await role.destroy();
  }
}
