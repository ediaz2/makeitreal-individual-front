import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Tab } from '@headlessui/react';
import * as Base from '@/components/base';
import { LayoutApp } from '@/layouts/LayoutApp';
import * as App from '@/components/app';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Dashboard: NextPage = () => {
  const sections = ['Perfil', 'Lista de Productos', 'Nuevo Producto'];
  const { data: session, status } = useSession();

  return (
    <LayoutApp title="Panel de control">
      <Base.Container>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-slate-500 p-1">
            {sections.map((section) => (
              <Tab
                key={section}
                className={({ selected }: { selected: boolean }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'font-bold text-base',
                    selected
                      ? 'text-slate-900 bg-white shadow'
                      : 'text-white hover:bg-white/[0.12] hover:text-white',
                  )
                }
              >
                {section}
              </Tab>
            ))}
          </Tab.List>
          {status === 'authenticated' && (
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <App.CardProfile session={session}></App.CardProfile>
              </Tab.Panel>
              <Tab.Panel>
                <App.CardProducts session={session}></App.CardProducts>
              </Tab.Panel>
              <Tab.Panel>
                <App.CardProductCreate session={session}></App.CardProductCreate>
              </Tab.Panel>
            </Tab.Panels>
          )}
        </Tab.Group>
      </Base.Container>
    </LayoutApp>
  );
};

export default Dashboard;
