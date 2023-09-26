import { useQuery } from '@tanstack/react-query';
import { Example, getExamples } from '../api/examples';
import ExamplesList from '../components/ExamplesList';

const Examples = () => {
  const { isLoading, error, data } = useQuery<Example[]>({
    queryKey: ['examplesData', 1],
    queryFn: getExamples,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return <ExamplesList items={data} />;
};

export default Examples;
