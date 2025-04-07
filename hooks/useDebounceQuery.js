import { useCallback, useState } from 'react';
import debounce from '../utils/debounce';

const useDebounceQuery = () => {
	const [query, setQuery] = useState('');

	const request = debounce((value) => {
		setQuery(value);
	}, 600);

	const debounceQuery = useCallback((value) => request(value), []);

	return { debounceQuery, query };
};

export default useDebounceQuery;
