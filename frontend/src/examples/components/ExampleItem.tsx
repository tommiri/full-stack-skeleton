import { Example } from '../api/examples';

const ExampleItem = ({ name, description }: Example) => {
  return (
    <li>
      <h3>{name}</h3>
      <p>{description}</p>
    </li>
  );
};

export default ExampleItem;
