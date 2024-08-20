import React from "react";

const NewsGlass = (props) => {
    const { newsTitle: title, newsThumbnail: thumbnail, newsSource: source, newsAuthor: author, newsDate: date } = props;

    function formatPublishedAt(isoString) {
        // Create a Date object from the ISO 8601 string
        const date = new Date(isoString);
        
        // Check if the date is valid
        if (isNaN(date)) {
            return "Invalid Date";
        }

        // Options for formatting the date and time
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,  // This will format the time in 12-hour format with AM/PM
        };

        // Format the date to a readable string
        return date.toLocaleString('en-US', options);
    }

    return (
        <div
            className="w-full py-3 px-4 md:px-[24px] relative backdrop-blur-sm rounded-md duration-200 p-2 border-solid border-[1px] border-white/30"
            style={{
                backgroundImage: 'linear-gradient(106deg, rgba(255, 255, 255, 42%) 0%, rgba(51, 51, 51, 24%) 100%)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
            <p className="font-medium mb-2">Movie Magazine</p>
            <div className="flex flex-col">
                {title.map((item, index) => (
                    <div className="flex mb-5" key={index}>
                        <div
                            className="flex-shrink-0 w-[145px] h-[120px] rounded-md bg-white"
                            style={{
                                backgroundImage: `url(${thumbnail[index]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className="ml-3">
                            <p className="text-xs leading-4 mt-2">{source[index]} • {formatPublishedAt(date[index])}</p>
                            <p className="md:text-base text-sm font-medium">{item}</p>
                          
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsGlass;
