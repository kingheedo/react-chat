import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const workspacesRepository = dataSource.getRepository(Workspaces);
    await workspacesRepository.insert([
      {
        id: 1,
        name: '테스트',
        url: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const channelRepository = dataSource.getRepository(Channels);
    await channelRepository.insert([
      {
        id: 1,
        name: '일반',
        // private: false,
        WorkspaceId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
