import { generateApiKey } from '../lib/generate-api-key';
import { db } from '../lib/db';
import * as bcrypt from 'bcryptjs';

async function main() {
  await db.$transaction(async (tx) => {
    // Clear existing data
    await tx.apiKey.deleteMany({});
    await tx.childProfile.deleteMany();
    await tx.wallet.deleteMany();
    await tx.user.deleteMany();
    await tx.role.deleteMany();

    console.log('✅: Beginning database Seeding...');

    // Create roles
    const roles = await Promise.all([
      tx.role.create({
        data: {
          name: 'ADMIN',
          description: 'System administrator with full access to all features',
          permissions: ['create', 'delete', 'update'],
        },
      }),
      tx.role.create({
        data: {
          name: 'PARENT',
          description: 'Parent user who can manage funds and child profiles',
          permissions: ['create', 'delete', 'update'],
        },
      }),
      tx.role.create({
        data: {
          name: 'CANTEEN_MANAGER',
          description: 'User who manages canteen operations and products',
          permissions: ['create', 'delete', 'update'],
        },
      }),
    ]);

    console.log('✅: Created roles:', roles.length);

    // Hash function
    const hashPassword = async (password: string) => {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    };

    // Current year for dynamic password generation
    const currentYear = new Date().getFullYear();

    // User data with role assignments
    const userData = [
      // Admin users
      {
        email: 'admin@schoolpay.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'System Administrator',
        firstName: 'System',
        lastName: 'Administrator',
        phone: '+1-555-123-4567',
        roleId: roles[0].id,
      },
      {
        email: 'tech@schoolpay.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Technical Support',
        firstName: 'Technical',
        lastName: 'Support',
        phone: '+1-555-987-6543',
        roleId: roles[0].id,
      },

      // Parent users
      {
        email: 'sarah.johnson@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Sarah Johnson',
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+1-555-234-5678',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'michael.davis@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Michael Davis',
        firstName: 'Michael',
        lastName: 'Davis',
        phone: '+1-555-345-6789',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'emily.wilson@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Emily Wilson',
        firstName: 'Emily',
        lastName: 'Wilson',
        phone: '+1-555-456-7890',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'david.thompson@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'David Thompson',
        firstName: 'David',
        lastName: 'Thompson',
        phone: '+1-555-567-8901',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'jennifer.smith@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Jennifer Smith',
        firstName: 'Jennifer',
        lastName: 'Smith',
        phone: '+1-555-678-9012',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'robert.martinez@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Robert Martinez',
        firstName: 'Robert',
        lastName: 'Martinez',
        phone: '+1-555-789-0123',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'laura.garcia@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Laura Garcia',
        firstName: 'Laura',
        lastName: 'Garcia',
        phone: '+1-555-890-1234',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'james.rodriguez@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'James Rodriguez',
        firstName: 'James',
        lastName: 'Rodriguez',
        phone: '+1-555-901-2345',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'nicole.lee@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Nicole Lee',
        firstName: 'Nicole',
        lastName: 'Lee',
        phone: '+1-555-012-3456',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'william.nguyen@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'William Nguyen',
        firstName: 'William',
        lastName: 'Nguyen',
        phone: '+1-555-210-9876',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'rebecca.patel@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Rebecca Patel',
        firstName: 'Rebecca',
        lastName: 'Patel',
        phone: '+1-555-321-8765',
        roleId: roles[1].id, // PARENT role
      },
      {
        email: 'thomas.kim@example.com',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Thomas Kim',
        firstName: 'Thomas',
        lastName: 'Kim',
        phone: '+1-555-432-7654',
        roleId: roles[1].id, // PARENT role
      },

      // Canteen manager users
      {
        email: 'main.canteen@school.edu',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Patricia Henderson',
        firstName: 'Patricia',
        lastName: 'Henderson',
        phone: '+1-555-543-2109',
        roleId: roles[2].id, // CANTEEN_MANAGER role
      },
      {
        email: 'secondary.canteen@school.edu',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Richard Coleman',
        firstName: 'Richard',
        lastName: 'Coleman',
        phone: '+1-555-654-3210',
        roleId: roles[2].id, // CANTEEN_MANAGER role
      },
      {
        email: 'snack.shop@school.edu',
        passwordHash: await hashPassword(`Login@${currentYear}`),
        name: 'Maria Santos',
        firstName: 'Maria',
        lastName: 'Santos',
        phone: '+1-555-765-4321',
        roleId: roles[2].id, // CANTEEN_MANAGER role
      },
    ];

    // Create all users in a single operation
    const users = await Promise.all(
      userData.map((userData) => tx.user.create({ data: userData })),
    );
    console.log('✅: Created users:', users.length);

    // Get only parents for creating wallets and child profiles
    const parents = users.filter((user) => user.roleId === roles[1].id);

    // Create API keys for each user
    const apiKeys = await Promise.all(
      users.map((user) =>
        tx.apiKey.create({
          data: {
            name: 'Default Key',
            key: generateApiKey(),
            userId: user.id,
          },
        }),
      ),
    );

    console.log('✅: Created API-KEY:', apiKeys.length);

    // ====== DAY TWO SEEDING - WALLETS AND CHILD PROFILES ======

    // Create wallets for parent users
    const wallets = await Promise.all(
      parents.map((parent) =>
        tx.wallet.create({
          data: {
            balance: Math.random() * 500 + 100, // Random balance between UGX 100-600
            userId: parent.id,
          },
        }),
      ),
    );

    console.log('✅: Created wallets:', wallets.length);

    // Child profiles data - create 1-3 children for each parent
    interface ChildProfileData {
      name: string;
      class: string;
      parentId: string;
      cardBalance: number;
      isActive: boolean;
    }

    const childProfileData: ChildProfileData[] = [];

    // Grade levels
    const classes = [
      'Kindergarten',
      'Primary 1',
      'Primary 2',
      'Primary 3',
      'Primary 4',
      'Primary 5',
      'Primary 6',
      'Primary 7',
    ];

    // First names for children
    const childFirstNames = [
      'Emma',
      'Liam',
      'Olivia',
      'Noah',
      'Ava',
      'William',
      'Sophia',
      'James',
      'Isabella',
      'Logan',
      'Charlotte',
      'Benjamin',
      'Amelia',
      'Mason',
      'Mia',
      'Elijah',
      'Harper',
      'Oliver',
      'Evelyn',
      'Jacob',
      'Abigail',
      'Lucas',
      'Emily',
      'Michael',
      'Elizabeth',
      'Alexander',
      'Sofia',
      'Ethan',
      'Avery',
      'Daniel',
      'Ella',
      'Matthew',
      'Scarlett',
      'Henry',
      'Grace',
      'Jackson',
      'Chloe',
      'Sebastian',
      'Victoria',
      'Aiden',
    ];

    // Generate child profiles
    parents.forEach((parent) => {
      // Determine number of children (1-3)
      const numChildren = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numChildren; i++) {
        // Generate random first name for child
        const firstName =
          childFirstNames[Math.floor(Math.random() * childFirstNames.length)];
        // Use parent's last name
        const lastName = parent.lastName;
        // Generate random class and section
        const studentClass =
          classes[Math.floor(Math.random() * classes.length)];
        // Random card balance between $0-100
        const cardBalance = Math.random() * 1000;

        childProfileData.push({
          name: `${firstName} ${lastName}`,
          class: studentClass,
          parentId: parent.id,
          cardBalance,
          isActive: Math.random() > 0.1, // 90% chance of being active
        });
      }
    });

    // Create all child profiles
    const childProfiles = await Promise.all(
      childProfileData.map((childData) =>
        tx.childProfile.create({ data: childData }),
      ),
    );

    console.log('✅: Created child profiles:', childProfiles.length);

    // Count users by role for reporting
    const adminCount = users.filter(
      (user) => user.roleId === roles[0].id,
    ).length;
    const parentCount = parents.length;
    const canteenManagerCount = users.filter(
      (user) => user.roleId === roles[2].id,
    ).length;

    // Log summary
    console.log('✅ Seeding completed:');
    console.log(`✅ - Created ${roles.length} roles`);
    console.log(`✅ - Created ${users.length} users`);
    console.log(`  * ${adminCount} admin users`);
    console.log(`  * ${parentCount} parent users`);
    console.log(`  * ${canteenManagerCount} canteen manager users`);
    console.log(`✅ - Created ${wallets.length} wallets`);
    console.log(
      `✅ - Created ${childProfiles.length} child profiles (avg ${(childProfiles.length / parentCount).toFixed(1)} per parent)`,
    );
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
