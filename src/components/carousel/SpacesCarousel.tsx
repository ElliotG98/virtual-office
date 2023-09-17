import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getSpacesByUser } from '@api/spaces';
import { Space } from '../../types/spaces';
import { useRouter } from 'next/router';
import { Tooltip } from '@nextui-org/react';

export const SpacesCarousel: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        const spaces = await getSpacesByUser();
        setSpaces(spaces);
    };

    const handleSpaceClick = (space_id: string, status?: string) => {
        if (status === 'approved') {
            router.push(`/spaces/${space_id}`);
        }
    };

    const carouselSettings = {
        arrows: true,
        dots: true,
        infinite: spaces.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        className: 'slides',
    };

    return (
        <div className="carousel-container w-full px-10">
            <Slider {...carouselSettings}>
                {spaces.map((space) => (
                    <Tooltip
                        key={space.space_id}
                        showArrow={true}
                        content={
                            space.status === 'requested'
                                ? 'Space Requested'
                                : null
                        }
                        className="space-card w-1/3"
                        isDisabled={space.status === 'approved'}
                    >
                        <div
                            key={space.space_id}
                            className={`${
                                space.status === 'requested'
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                            }`}
                            onClick={() =>
                                handleSpaceClick(space.space_id, space.status)
                            }
                        >
                            <div
                                className={`bg-gray-300 h-32 w-32 flex items-center justify-center m-auto ${
                                    space.status === 'requested'
                                        ? 'opacity-50'
                                        : 'opacity-100'
                                }`}
                            >
                                {space.name}
                            </div>

                            <div className="text-center mt-2">{space.name}</div>
                        </div>
                    </Tooltip>
                ))}
            </Slider>
        </div>
    );
};
