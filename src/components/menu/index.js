import React, {useState} from 'react';
import { PiArchive, PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Menu = ({
    isActive = true,
    title = "Navigation",
    iconMenuActive = PiArchive,
    iconMenuPassive = PiArchive,
    isOpen = false,
    type = "parent",
    isHaveChild = false,
    isExpand = true,
    subMenu = null,
    urlLink
}) => {
    const IconComponentActive = iconMenuActive;
    const IconComponentPassive = iconMenuPassive;
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const navigateTo = useNavigate()

    function navigateToMenu(navigation) {
        navigateTo(navigation)
    }

  return (
    <div
        className={`
            ${isActive ? (type === "parent" && isExpand && isHaveChild ? "bg-primary500" : "bg-primary50") : "bg-white hover:bg-neutral20"}
            ${isActive ? (type === "parent" && !isExpand && isHaveChild && subMenu.length === 0 ? "bg-primary500" : "bg-primary50") : "bg-white hover:bg-neutral20"}
            ${isExpand ? "justify-between" : "justify-center"}
            flex items-center rounded-lg py-2.5 px-2 mb-1.5 cursor-pointer`
        }
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
    >
        <div className='flex items-center'>
            <div className='w-5 h-5'>
            {
                type === "parent" && (
                    isActive ?
                        isExpand ?
                            !isHaveChild ?
                            (<IconComponentActive
                                size="20"
                                className="text-primary500"
                            />)
                            :
                            (<IconComponentActive
                                size="20"
                                className="text-white"
                            />)
                            :
                            subMenu.length === 0 && isHaveChild ?
                                (<IconComponentActive
                                    size="20"
                                    className="text-white"
                                />)
                                :
                                (<IconComponentActive
                                    size="20"
                                    className="text-primary500"
                                />)
                        :
                        (<IconComponentPassive
                            size="20"
                            className="text-neutral500"
                        />)
                    )
                }
                {
                    (type === "child" && !isExpand) && (
                        isActive ? 
                            (<IconComponentActive
                                size="20"
                                className="text-primary500"
                            />) 
                            : 
                            (<IconComponentPassive
                                size="20"
                                className="text-neutral500"
                            />)
                    )
                }
            </div>
            {
                isExpand && (
                    <p
                        className={`
                        ${isActive ? (type === "parent" && isHaveChild ? "text-white" : "text-primary500") : "text-neutral500"}
                        pl-3 font-semibold text-sm`}
                    >
                        {title}
                    </p>
                )
            }
        </div>
        {(type === "parent" && isHaveChild && isExpand) && (
            <div className='w-5 h-5'>
                {isOpen ? (
                    <PiCaretUp
                        size="20"
                        className={isActive ? "text-white" : "text-neutral500"}
                    />
                ) : (
                    <PiCaretDown
                        size="20"
                        className={isActive ? "text-white" : "text-neutral500"}
                    />
                )}
            </div>
        )}
        {
            !isExpand && isTooltipVisible &&
            <div className='absolute left-2 z-50'>
                <div className='ml-16 bg-white border border-neutral40 rounded-md shadow-md'>
                    {
                        subMenu.length != 0 ?
                        subMenu.map((value) => 
                            <div className='hover:bg-neutral20 px-4 py-2 rounded-md' onClick={() => navigateToMenu(value.urlLink)}>
                                <p>{value.title}</p>
                            </div>
                        )
                        :
                        <div className='hover:bg-neutral20 px-4 py-2 rounded-md' onClick={() => navigateToMenu(urlLink)}>
                            <p>{title}</p>
                        </div>
                    }
                </div>
            </div>
        }
    </div>
  );
};

export default Menu;