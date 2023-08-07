"use client";
import { useRouter } from "next/navigation";
import { Button } from ".";

type props = {
    startCursor: string,
    endCursor: string,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}

// pagination 
const LoadMore = ({startCursor, endCursor, hasNextPage, hasPreviousPage}: props) => {
    const router = useRouter();

    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search);

        if(direction === 'next' && hasNextPage) {
            currentParams.delete('startcursor');
            currentParams.set('endcursor', endCursor)
        } else if (direction === 'first' && hasPreviousPage) {
            currentParams.delete('endcursor');
            currentParams.set('startcursor', startCursor)
        }

        const newSearchParams = currentParams.toString();
        const newPathName = `${window.location.pathname}?${newSearchParams}`
        router.push(newPathName)
    }

  return (
    <div className="gap-5 mt-10 flexCenter w-full">
        {hasPreviousPage && (
            <Button 
                title="First Page"
                handleClick={() => handleNavigation('first')}
            />
        )}

        {hasNextPage && (
            <Button 
                title="Next Page"
                handleClick={() => handleNavigation('next')}
            />
        )}
    </div>
  )
}

export default LoadMore