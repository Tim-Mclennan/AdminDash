import { getNameInitials } from '@/utilities';
import { Avatar, AvatarProps } from 'antd'

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = ({ name = "", style, ...rest }: Props) => {
  return (
      <Avatar
        alt={'Tim McLennan'}
        size='small'
        style={{ 
          backgroundColor: '#blue',
          display: 'flex',
          alignItems: 'center',
          border: 'none',
          ...style,
      }}
      {...rest}
      >
        {getNameInitials(name || "")}
      </Avatar>
    )
}

export default CustomAvatar