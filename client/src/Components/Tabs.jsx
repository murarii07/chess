import { useState } from 'react'
import { Tab,TabGroup,TabList,TabPanel,TabPanels } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example(props) {
  let [categories] = useState(props.component)

  return (
    <div className="w-[95%]">
      <TabGroup  defaultIndex={props.index} >
        <TabList className=" p-3 flex space-x-1 rounded-xl" >
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <TabPanel
              key={idx}
            //   className={}
            >
             {posts}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  )
}
