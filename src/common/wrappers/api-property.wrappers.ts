import { ApiProperty } from '@nestjs/swagger';

export const RiaUniqId = ApiProperty({ example: 1, description: 'Unique identifier' });
export const RiaApiPropertyEmail = ApiProperty({ example: 'user@mail.ru', description: 'Email' });
export const RiaApiPropertyPassword = ApiProperty({ example: '12345678', description: 'Password' });
export const RiaApiPropertyUserId = ApiProperty({ example: '11', description: 'User id' });
export const RiaApiPropertyRoleName = ApiProperty({ example: 'ADMIN', description: 'Role name' });
export const RiaApiPropertyRoleDescription = ApiProperty({ example: 'This is a role for regular users', description: 'Role description' });
export const RiaApiPropertyReasonForBlock = ApiProperty({ example: 'Bad guy', description: 'Reason for block' });
export const RiaApiPropertyIsUserBlocked = ApiProperty({ example: true, description: 'Blocked or not' });
