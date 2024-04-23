import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function JosefinText(props: TextProps) {
  let font = 'Josefin';
  switch (props.weight) {
    case 'semi':
      font = 'JosefinSemi';
      break;
    case 'light':
      font = 'JosefinLight';
      break;
  }
  return <Text {...props} style={[props.style, { fontFamily: font }]} />;
}
