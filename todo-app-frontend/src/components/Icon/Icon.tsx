import React, { useEffect, useState } from 'react';

type IconProps = {
  variant: string;
};

export const Icon: React.FC<IconProps> = ({ variant }) => {
  const [iconSrc, setIconsrc] = useState();

  useEffect(() => {
    const mount = async () => {
      const result = await import(`../../../public/${variant}.svg`);
      setIconsrc(result.default);
    };
    mount();
  }, [variant]);

  return <img src={iconSrc} width="22px" height={'22px'} alt={variant} />;
};
