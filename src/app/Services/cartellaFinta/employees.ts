export interface Employee {
  id: number;
  managerId?: number;
  name: string;
  title: string;
  phone: string;
  hireDate?: Date;
  dragging?: boolean;
}

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Daryl Sweeney',
    title: 'Chief Executive Officer',
    phone: '(555) 924-9726',
    managerId: undefined,
    hireDate: new Date('2019-01-15'),
  },
  {
    id: 2,
    name: 'Guy Wooten',
    title: 'Chief Technical Officer',
    phone: '(438) 738-4935',
    managerId: 1,
    hireDate: new Date('2019-02-19'),
  },
  {
    id: 32,
    name: 'Buffy Weber',
    title: 'VP, Engineering',
    phone: '(699) 838-6121',
    managerId: 2,
    hireDate: new Date('2019-04-13'),
  },
  {
    id: 45,
    name: 'Zelda Medina',
    title: 'QA Architect',
    phone: '(563) 359-6023',
    managerId: 32,
    hireDate: new Date('2018-08-16'),
  },
  {
    id: 3,
    name: 'Priscilla Frank',
    title: 'Chief Product Officer',
    phone: '(217) 280-5300',
    managerId: 32,
    hireDate: new Date('2019-04-22'),
  },
  {
    id: 4,
    name: 'Ursula Holmes',
    title: 'EVP, Product Strategy',
    phone: '(370) 983-8796',
    managerId: 32,
    hireDate: new Date('2018-01-15'),
  },
  {
    id: 24,
    name: 'Melvin Carrillo',
    title: 'Director, Developer Relations',
    phone: '(344) 496-9555',
    managerId: 1,
    hireDate: new Date('2018-01-17'),
  },
  {
    id: 29,
    name: 'Martha Chavez',
    title: 'Developer Advocate',
    phone: '(140) 772-7509',
    managerId: 24,
    hireDate: new Date('2018-05-14'),
  },
  {
    id: 30,
    name: 'Oren Fox',
    title: 'Developer Advocate',
    phone: '(714) 284-2408',
    managerId: 24,
    hireDate: new Date('2018-07-19'),
  },
];
