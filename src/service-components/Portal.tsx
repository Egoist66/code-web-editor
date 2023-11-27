import { FC, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
     children: ReactNode
     node?: HTMLElement
}

export const Portal: FC<PortalProps> = ({ children, node = document.body}) => {

     const [container, setContainer] = useState<HTMLElement | null>(null);

     useEffect(() => {
          const portalContainer = document.createElement('div');

          portalContainer.className = 'portal-elem'
          node.appendChild(portalContainer)

          setContainer(portalContainer);

          return () => {
               node.removeChild(portalContainer);
          };
     }, []);

     return container ? ReactDOM.createPortal(children, container) : null;
};