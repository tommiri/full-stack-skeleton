import { Example } from '../api/examples';
import ExampleItem from './ExampleItem';

type ListProps = {
  items: Example[] | undefined;
};

const ExamplesList = ({ items }: ListProps) => {
  if (!items || !items.length) {
    return (
      <div>
        <h2>No examples found.</h2>
      </div>
    );
  }

  return (
    <ul>
      {items.map((item, i) => (
        <ExampleItem key={i} name={item.name} description={item.description} />
      ))}
    </ul>
  );
};

export default ExamplesList;
