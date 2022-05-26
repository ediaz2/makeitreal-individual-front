import type { FunctionComponent } from 'react';
import * as Base from '@/components/base';
import { MailIcon, BriefcaseIcon, GlobeAltIcon } from '@heroicons/react/solid';

export const CardProfile: FunctionComponent<{
  session: any;
}> = ({ session }) => {
  return (
    <Base.Box className="p-4 mt-2">
      <div className="flex flex-col   pl-10  pb-10">
        <h1 className="text-3xl text-gray-900 font-semibold">
          {session.user.name}
        </h1>
        <div className="mb-2 mt-2">
          <h1 className="text-base text-gray-700 font-semibold">Tienda</h1>
          <p className="text-base font-semibold">{session.user.tenant}</p>
        </div>
        <div className="mb-2 mt-2">
          <h1 className="text-base text-gray-700 font-semibold">Detalles</h1>
          <div className="mt-2 flex items-center">
            <BriefcaseIcon className="h-6 w-6"></BriefcaseIcon>
            <h1 className="text-base ml-5 font-semibold">{session.user.ruc}</h1>
          </div>
          <div className="mt-2 flex items-center">
            <MailIcon className="h-6 w-6"> </MailIcon>
            <h1 className="text-base ml-5 font-semibold">
              {session.user.email}
            </h1>
          </div>
          <div className="mt-2 flex items-center">
            <GlobeAltIcon className="h-6 w-6"></GlobeAltIcon>
            <h1 className="text-base ml-5 font-semibold">
              <a
                href={`https://${session.user.tenant}.mytienda.xyz`}
                target="_blank"
                rel="noreferrer"
              >{`https://${session.user.tenant}.mytienda.xyz`}</a>
            </h1>
          </div>
        </div>
      </div>
    </Base.Box>
  );
};
