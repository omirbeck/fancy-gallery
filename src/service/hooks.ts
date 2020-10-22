import { useState, useEffect, useRef } from 'react';
import { Image } from './type';
import axios from 'axios';

export const useFetchData = (path: string) => {
    const [data, setData] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (path) {
            const isSearch = path.includes('search');
            setLoading(true);
            setHasError(true);
            axios.get(path)
                .then(response => {
                    if (isSearch) {
                        setData(response.data.results);
                    } else {
                        setData(response.data);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setHasError(true);
                    setLoading(false);
                })
        }
    }, [path])
    return { data, loading, hasError }
}

export const useIntersactionObserver = () => {
    const loader = useRef<HTMLDivElement>(null);
    const [hasInterSection, setHasInterSection] = useState(false);


    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0];

        if (target.intersectionRatio > 0) {
            setHasInterSection(true)
        } else {
            setHasInterSection(false)
        }
    };


    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            treshold: 1,
        };

        const observer = new IntersectionObserver(handleObserver, options);

        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    return { loader, hasInterSection };
}
