import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Button,
  Stack,
  Center,
  Indicator,
} from "@mantine/core";
import {
  TablerIcon,
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons";
import "../styles.css";
import { BsPlusSquareDotted } from "react-icons/bs";
import useStore from "../store";
import { GiWaterfall } from "react-icons/gi";
import { Dialog, TextInput } from "@mantine/core";
import { Avatar, Badge, Table, Select, ScrollArea, SegmentedControl } from "@mantine/core";
import { socket } from "../index.js";

const useStyles = createStyles((theme) => ({
  control: {
    // border: "2px dotted",
    // borderColor: "red",

    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? "#2F1138" : "#2F1138",
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? "rgba(47, 17, 56,0.1)" : "rgba(47, 17, 56,0.1)",
      color: theme.colorScheme === "dark" ? "rgba(47, 17, 56,0.5)" : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "white" : "white",
    borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "rgba(47, 17, 56,0.1)",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, index, tasks, subtasks }) {
  const [opened2, setOpened2] = useState(false);
  const mockData = useStore((state) => state.mockData);
  const setMockData = useStore((state) => state.setMockData);
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const [count, setCount] = useState(0);
  const [subTaskCount, setSubTaskCount] = useState(0);
  const supabase = createClient("https://rgcevqebcazzqaumgwnh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnY2V2cWViY2F6enFhdW1nd25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5ODkyNjAsImV4cCI6MTk5MDU2NTI2MH0.UjirHUUhj_Y8qaLM41pxPNG49n_jRVst0zDubKG0vEg")
  const [dbindex, setDbindex] = useState(0);


  useEffect(() => {
    if (tasks) {
      setCount(tasks.length);
    }
  }, [tasks, links]);

  const items = (hasLinks ? links : []).map((link, subtopicIndex) => (
    <>
      <Group position="apart">
        <Text
          component="a"
          className={classes.link}
          href={link.link}
          key={link.label}
          // onClick={(event) => handleLabelClick(event, index, subtopicIndex)}
        >
          {link.label}
        </Text>

        <Button
          mr={10}
          disabled={mockData[index]?.links[subtopicIndex]?.tasks?.length === 5}
          // disabled
          onClick={(e) => handleSubsubTask(e, index, subtopicIndex)}
          size="xs"
          variant="outline"
          color="teal"
          compact
        >
          Add Task ({links[subtopicIndex].tasks === undefined ? 0 : links[subtopicIndex].tasks?.length})
        </Button>
      </Group>
    </>
  ));

  async function addSubtopic() {
    const current = new Date();
    let month = `${current.getMonth()+1}`;
    let day = `${current.getDate()}`;
    const year = `${current.getFullYear()}`;
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    const date = [day, month, year].join('-');

    await supabase
      .from("subproject_sample")
      .insert([
        {
          id: uuidv4(),
          created_at: date,
          title: taskName,
          status: "incomplete",
          from_project: "123e4567-e89b-12d3-a456-426614174000",
          index: dbindex + 1,
        },
      ])
      .single();

      setDbindex(dbindex + 1)

      console.log("added sub to db")
      console.log()
  }

  async function addTask() {
    const current = new Date();
    let month = `${current.getMonth()+1}`;
    let day = `${current.getDate()}`;
    const year = `${current.getFullYear()}`;
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    const date = [day, month, year].join('-');

    await supabase
      .from("subsubproject_sample")
      .insert([
        {
          id: uuidv4(),
          created_at: date,
          title: taskName,
          status: "incomplete",
          from_project: "123e4567-e89b-12d3-a456-426614174000",
          parent: subIndex + 1
        },
      ])
      .single();

      console.log("added sub to db")
      console.log(subIndex)
  }


  const handleAddSubsubTask = () => {
    setSubsubMax(subsubMax + 1);
    if (mockData.length > 0 && mockData[parentIndex] && mockData[parentIndex].links && mockData[parentIndex].links.length > 0) {
      const updatedTopics = [...mockData];
      updatedTopics[parentIndex] = {
        ...updatedTopics[parentIndex],
        links: [
          ...updatedTopics[parentIndex].links.slice(0, subIndex),
          {
            ...updatedTopics[parentIndex].links[subIndex],
            tasks: [
              ...(updatedTopics[parentIndex].links[subIndex].tasks || []),
              {
                label: taskName,
              },
            ],
          },
          ...updatedTopics[parentIndex].links.slice(subIndex + 1),
        ],
      };
      socket.emit("newHandleAddSubTask",updatedTopics);
      setMockData(updatedTopics);
      setTaskName("");
      setOpened2(false);
      addTask()
    }
  };
  const [subIndex, setSubIndex] = useState(null);
  const handleSubsubTask = (event, topicIndex, subtopicIndex) => {

    event.stopPropagation();
    setDialogState("subsubtask");
    setOpened2(true);
    setParentIndex(topicIndex);
    setSubIndex(subtopicIndex);
  };

  useEffect(() => {
    socket.on("handleAddSubtopic", (updatedTopics) => {
      for(let i =0;i<updatedTopics.length;i++){
        updatedTopics[i].icon = GiWaterfall;
      }
      setMockData(updatedTopics);
    });

    socket.on("handleAddMainTask", (updatedTopics) => {
      for(let i =0;i<updatedTopics.length;i++){
        updatedTopics[i].icon = GiWaterfall;
      }
      setMockData(updatedTopics);
    });

    socket.on("handleAddSubTask", (updatedTopics) => {
      for(let i =0;i<updatedTopics.length;i++){
        updatedTopics[i].icon = GiWaterfall;
      }
      setMockData(updatedTopics);
    });

    return () => {
      socket.off("handleAddSubtopic");
      socket.off("handleAddMainTask");
      socket.off("handleAddSubTask");
    };

  }, [mockData]);

  const handleAddSubtopic = () => {
    const updatedTopics = [...mockData];
    updatedTopics[parentIndex] = {
      ...updatedTopics[parentIndex],
      links: [...updatedTopics[parentIndex].links, { label: taskName, link: "/" }],
    };
    socket.emit("newHandleAddSubtopic", updatedTopics);
    setMockData(updatedTopics);
    setTaskName("");
    setOpened2(false);
    addSubtopic()
  };
  const handleSubtopic = (index) => {
    setDialogState("subtopic");
    setOpened2(true);
    setParentIndex(index);
  };
  const [dialogState, setDialogState] = useState("");

  const [parentIndex, setParentIndex] = useState(null);

  const handleAddSubTask = (event, index) => {
    console.log("main task")
    const updatedTopics = [...mockData];
    updatedTopics[parentIndex] = {
      ...updatedTopics[parentIndex],
      tasks: [...updatedTopics[parentIndex].tasks, { tasks: parentIndex, label: taskName }],
    };

    socket.emit("newHandleAddMainTask",updatedTopics)
    setMockData(updatedTopics);
    setTaskName("");
    setOpened2(false);
  };
  const handleSubTask = (event, index) => {
    event.stopPropagation();
    setDialogState("subtask");
    setOpened2(true);
    setParentIndex(index);
  };

  const [maxLinks, setMaxLinks] = useState(false);
  const [maxTasks, setMaxTasks] = useState(false);
  const [maxSubTasks, setMaxSubTasks] = useState(true);
  const [subsubMax, setSubsubMax] = useState(0);

  // useEffect(() => {
  //   console.log(subsubMax);
  //   if (subsubMax >= 5) {
  //     setMaxSubTasks(true);
  //   }
  // }, [subsubMax]);

  useEffect(() => {
    if (subtasks.length >= 5) {
      setMaxSubTasks(true);
    }
  }, [subtasks]);

  useEffect(() => {
    if (tasks.length >= 4) {
      setMaxTasks(true);
    }
  }, [tasks]);

  useEffect(() => {
    if (links.length >= 5) {
      setMaxLinks(true);
    }
  }, [links]);

  const [taskName, setTaskName] = useState("");

  const [controlTopic, setControlTopic] = useState();
  const [controlSubTopic, setControlSubTopic] = useState();

  // const handleLabelClick = (event, topicIndex, subtopicIndex) => {
  //   event.preventDefault();
  //   setOpened3(true);
  //   // console.log(links);

  //   setControlTopic(topicIndex);
  //   setControlSubTopic(subtopicIndex);
  //   // console.log(topicIndex, subtopicIndex);
  //   // console.log(mockData[topicIndex].links[subtopicIndex].tasks);
  // };

  // const rolesData = ["Initialized", "In Progress", "Completed"];

  const [value, setValue] = useState("initialized");
  const [opened3, setOpened3] = useState(false);

  const rows = mockData[controlTopic]?.links[controlSubTopic]?.tasks?.map(
    (task) => (
      // console.log(link)
      // link.tasks?.map((task) => (
      <tr key={task}>
        <td>
          <Group spacing="sm">
            {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
            <div>
              <Text size="sm" weight="bold">
                {task.label}
              </Text>
              {/* <Text size="xs" color="dimmed">
              {item.email}
            </Text> */}
            </div>
          </Group>
        </td>

        <td>
          {/* <Select
          data={rolesData}
          defaultValue={link.status}
          variant="unstyled"
        /> */}
          <SegmentedControl
            value={value}
            onChange={setValue}
            data={[
              { label: "Initialized", value: "initialized" },
              { label: "In Progress", value: "progress" },
              { label: "Complete", value: "complete" },
            ]}
          />
        </td>
        {/* <td>{Math.floor(Math.random() * 6 + 5)} days ago</td> */}
        {/* <td>
        {Math.random() > 0.5 ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </td> */}
      </tr>
    )
    // ))
  );
  const theTopicIndex = useStore((state) => state.topicIndex);
  const theSubtopicIndex = useStore((state) => state.subtopicIndex);
  const theTaskIndex = useStore((state) => state.taskIndex);
  const setTopicIndex = useStore((state) => state.setTopicIndex);
  const setSubtopicIndex = useStore((state) => state.setSubtopicIndex);
  const setTaskIndex = useStore((state) => state.setTaskIndex);

  // const [theTopicIndex] = useStore((state) => state.topicIndex);
  // const [theSubtopicIndex] = useStore((state) => state.subtopicIndex);

  useEffect(() => {
    // console.log(theTopicIndex, theSubtopicIndex, theTaskIndex);
    setOpened3(true);
  }, [theTopicIndex, theSubtopicIndex, theTaskIndex]);

  const [segmentedValue, setSegmentedValue] = useState("initialized");
  const setSegmentedValueTask = (value) => {
    setSegmentedValue(value);
    console.log(value);

    if (
      mockData.length > 0 &&
      mockData[theTopicIndex] &&
      mockData[theTopicIndex].links &&
      mockData[theTopicIndex].links[theSubtopicIndex] &&
      mockData[theTopicIndex].links[theSubtopicIndex].tasks &&
      mockData[theTopicIndex].links[theSubtopicIndex].tasks.length > 0
    ) {
      const updatedTopics = [...mockData];
      updatedTopics[theTopicIndex] = {
        ...updatedTopics[theTopicIndex],
        links: [
          ...updatedTopics[theTopicIndex].links.slice(0, theSubtopicIndex),
          {
            ...updatedTopics[theTopicIndex].links[theSubtopicIndex],
            tasks: [
              ...updatedTopics[theTopicIndex].links[
                theSubtopicIndex
              ].tasks.slice(0, theTaskIndex),
              {
                ...updatedTopics[theTopicIndex].links[theSubtopicIndex].tasks[
                  theTaskIndex
                ],
                progress: value,
              },
              ...updatedTopics[theTopicIndex].links[
                theSubtopicIndex
              ].tasks.slice(theTaskIndex + 1),
            ],
          },
          ...updatedTopics[theTopicIndex].links.slice(theSubtopicIndex + 1),
        ],
      };
      setMockData(updatedTopics);
    }
  };

  return (
    <>

      {/* <Stack>

          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Topic: {mockData[controlTopic]?.links[controlSubTopic]?.label}
          </Text>
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Tasks:
            {mockData[controlTopic]?.links[controlSubTopic]?.tasks?.map(
              (task, index) => (
                <Text key={index}>{task.label}</Text>
              )
            )}
          </Text>
        </Stack> */}
    
      {mockData[theTopicIndex]?.links[theSubtopicIndex]?.tasks?.length > 0 && (
        <>
          <Dialog
            onClose={() => setOpened3(false)}
            opened={opened3}
            size="lg"
            radius="md"
            position={{ top: 20, right: 20 }}
            withCloseButton
          >
            <Center>
              <Text
                td="underline"
                size="sm"
                style={{ marginBottom: 10 }}
                weight={500}
              >
                {
                  mockData[theTopicIndex]?.links[theSubtopicIndex]?.tasks[
                    theTaskIndex
                  ]?.label
                }
              </Text>
            </Center>
            <Center>
              <SegmentedControl
                value={segmentedValue}
                onChange={(segmentedValue) =>
                  setSegmentedValueTask(segmentedValue)
                }
                data={[
                  { label: "Initialized", value: "initialized" },
                  { label: "In Progress", value: "progress" },
                  { label: "Complete", value: "complete" },
                ]}
              />
            </Center>
          </Dialog>
        </>
      )}

      <Dialog opened={opened2} withCloseButton onClose={() => setOpened2(false)} size="lg" radius="md">
        {dialogState === "subtask" && (
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Add Task to {label}
          </Text>
        )}
        {dialogState === "subtopic" && (
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Add Subtopic to {label}
          </Text>
        )}
        {dialogState === "subsubtask" && (
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Add subtask
          </Text>
        )}

        <Group align="flex-end">
          {dialogState === "subtask" && <TextInput placeholder="New Task" style={{ flex: 1 }} onChange={(e) => setTaskName(e.target.value)} value={taskName} />}
          {dialogState === "subtopic" && <TextInput placeholder="New Subtopic" style={{ flex: 1 }} onChange={(e) => setTaskName(e.target.value)} value={taskName} />}
          {dialogState === "subsubtask" && <TextInput placeholder="New Task" style={{ flex: 1 }} onChange={(e) => setTaskName(e.target.value)} value={taskName} />}
          {dialogState === "subtask" && (
            <Button variant="light" color="violet" onClick={() => {handleAddSubTask()}}>
              Submit
            </Button>
          )}
          {dialogState === "subtopic" && (
            <Button variant="light" color="violet" onClick={() => {handleAddSubtopic()}}>
              Submit
            </Button>
          )}
          {dialogState === "subsubtask" && (
            <Button variant="light" color="violet" onClick={handleAddSubsubTask}>
              Submit
            </Button>
          )}
        </Group>
      </Dialog>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon color="violet" variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>

          <Button disabled={maxTasks} onClick={(e) => handleSubTask(e, index)} size="xs" variant="outline" color="teal" compact>
            Add Task ({count})
          </Button>

          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          {/* <Stack> */}
          {items}
          <Center>
            <Button size="xs" disabled={maxLinks} mt={20} mb={20} onClick={() => handleSubtopic(index)} variant="light" color="violet" rightIcon={<BsPlusSquareDotted color="violet" />}>
              Add Subtopic
            </Button>
          </Center>
          {/* </Stack> */}
        </Collapse>
      ) : null}
    </>
  );
}
