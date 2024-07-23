import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Home() {

  return (
    <section>
      <div className="text-2xl">Check check check</div>
      <TabGroup>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
}
