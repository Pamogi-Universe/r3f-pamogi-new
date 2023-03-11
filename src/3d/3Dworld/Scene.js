import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useGLTF, Stage, Grid, OrbitControls, Environment, Hud, Text as DreiText } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Center, Image } from '@mantine/core';
import * as THREE from 'three';
import gsap from 'gsap';
import useStore from '../store';

// import Trees from "./models/Trees";
// import River1 from "./models/River1";
// import River2 from "./models/River2";
// import River3 from "./models/River3";
// import River4 from "./models/River4";
// import River5 from "./models/River5";
// import River6 from "./models/River6";
// import { OrthographicCamera } from "@react-three/drei";
// import {
//   Navbar,
//   Group,
//   Code,
//   ScrollArea,
//   createStyles,
//   Button,
//   Container,
// } from "@mantine/core";
// import {
//   IconNotes,
//   IconCalendarStats,
//   IconGauge,
//   IconPresentationAnalytics,
//   IconFileAnalytics,
//   IconAdjustments,
//   IconLock,
// } from "@tabler/icons";
// import { UserButton } from "./interface/UserButton";
// import { LinksGroup } from "./interface/LinksGroup";
// import { GrOverview } from "react-icons/gr";
// import { GiWaterfall } from "react-icons/gi";
// import { BsPlusSquareDotted } from "react-icons/bs";
import Waterfall from '../newerModels/Waterfall';
import Hook1 from '../newerModels/Hook1';
import Sub11 from '../newerModels/Sub11';
import Sub12 from '../newerModels/Sub12';
import Sub13 from '../newerModels/Sub13';
import Sub14 from '../newerModels/Sub14';
import Sub15 from '../newerModels/Sub15';
import Tree11 from '../newerModels/Tree11';
import Tree12 from '../newerModels/Tree12';
import Tree13 from '../newerModels/Tree13';
import Tree14 from '../newerModels/Tree14';
// import Task111 from "./newerModels/Task111";
// import Task112 from "./newerModels/Task112";
// import Task113 from "./newerModels/Task113";
// import Task114 from "./newerModels/Task114";
// import Task115 from "./newerModels/Task115";
import { Dialog, TextInput, Text } from '@mantine/core';

export default function Scene(props) {
    useEffect(() => {
        setTargetPosition([0 + props.navIndex * 5, -1.85, 0 - props.navIndex * 2.5]);
        setIsMoving(true);
    }, [props.navIndex]);
    const [targetPosition, setTargetPosition] = useState([0, -1.85, 0]);
    const [waterfalls, setWaterfalls] = useState([]);
    const [isMoving, setIsMoving] = useState(true);
    const handleClick = (index) => {
        setTargetPosition([0 + index * 5, -1.85, 0 - index * 2.5]);
        setIsMoving(true);
    };
    const [branchOne, setBranchOne] = useState();
    const [branchTwo, setBranchTwo] = useState();
    const [branchThree, setBranchThree] = useState();
    const [branchFour, setBranchFour] = useState();
    const [branchFive, setBranchFive] = useState();
    const [subTasks, setSubTasks] = useState();
    const [subTasks2, setSubTasks2] = useState();
    const [subTasks3, setSubTasks3] = useState();
    const [subTasks4, setSubTasks4] = useState();
    const [subTasks5, setSubTasks5] = useState();
    // const [subsubTasks, setSubsubTasks] = useState();
    const [subsubTasks2, setSubsubTasks2] = useState();
    const [subsubTasks3, setSubsubTasks3] = useState();
    const [subsubTasks4, setSubsubTasks4] = useState();
    const [subsubTasks5, setSubsubTasks5] = useState();
    const [subsubTasks, setSubsubTasks] = useState({});
    const [topic1Tasks, setTopic1Tasks] = useState({});
    const [topic2Tasks, setTopic2Tasks] = useState({});
    const [topic3Tasks, setTopic3Tasks] = useState({});
    const [topic4Tasks, setTopic4Tasks] = useState({});
    const [topic5Tasks, setTopic5Tasks] = useState({});

    const theTopicIndex = useStore((state) => state.topicIndex);
    const theSubtopicIndex = useStore((state) => state.subtopicIndex);
    const theTaskIndex = useStore((state) => state.taskIndex);
    const setTopicIndex = useStore((state) => state.setTopicIndex);
    const setSubtopicIndex = useStore((state) => state.setSubtopicIndex);
    const setTaskIndex = useStore((state) => state.setTaskIndex);

    const handleTaskIndexer = (topicIndex, subtopicIndex, taskIndex) => {
        setTopicIndex(topicIndex);
        setSubtopicIndex(subtopicIndex);
        setTaskIndex(taskIndex);
    };

    useEffect(() => {
        if (
            props.mockdata.length === 1 ||
            props.mockdata.length === 2 ||
            props.mockdata.length === 3 ||
            props.mockdata.length === 4 ||
            props.mockdata.length === 5
        ) {
            let topic1Tasks = {};
            let topic2Tasks = {};
            let topic3Tasks = {};
            let topic4Tasks = {};
            let topic5Tasks = {};
            if (props.mockdata.length > 0) {
                props.mockdata.map((topic, topicIndex) => {
                    if (topicIndex === 0) {
                        topic.links.map((subtopic, subtopicIndex) => {
                            if (subtopic.tasks && Array.isArray(subtopic.tasks)) {
                                topic1Tasks[subtopicIndex] = [];
                                for (let taskIndex = 0; taskIndex < subtopic.tasks.length; taskIndex++) {
                                    if (taskIndex < 5) {
                                        const task = subtopic.tasks[taskIndex];
                                        const TaskComponent = require(`../newerModels/Task${1}${subtopicIndex + 1}${
                                            taskIndex + 1
                                        }`).default;
                                        topic1Tasks[subtopicIndex].push(
                                            <TaskComponent
                                                key={`Task${1}${subtopicIndex + 1}${taskIndex + 1}`}
                                                rotate={0}
                                                onClick={
                                                    () => handleTaskIndexer(topicIndex, subtopicIndex, taskIndex)
                                                    // console.log(topicIndex, subtopicIndex, taskIndex)
                                                }
                                                progress={task.progress}
                                            />
                                        );
                                    }
                                }
                            }
                        });
                        setTopic1Tasks(topic1Tasks);
                    }
                    if (topicIndex === 1) {
                        topic.links.map((subtopic, subtopicIndex) => {
                            if (subtopic.tasks && Array.isArray(subtopic.tasks)) {
                                topic2Tasks[subtopicIndex] = [];
                                for (let taskIndex = 0; taskIndex < subtopic.tasks.length; taskIndex++) {
                                    if (taskIndex < 5) {
                                        const task = subtopic.tasks[taskIndex];
                                        const TaskComponent = require(`../newerModels/Task${1}${subtopicIndex + 1}${
                                            taskIndex + 1
                                        }`).default;
                                        topic2Tasks[subtopicIndex].push(
                                            <>
                                                <TaskComponent
                                                    key={`Task${1}${subtopicIndex + 1}${taskIndex + 1}`}
                                                    rotate={Math.PI}
                                                    onClick={() => handleTaskIndexer(topicIndex, subtopicIndex, taskIndex)}
                                                    progress={task.progress}
                                                />
                                            </>
                                        );
                                    }
                                }
                            }
                        });
                        setTopic2Tasks(topic2Tasks);
                    }
                    if (topicIndex === 2) {
                        topic.links.map((subtopic, subtopicIndex) => {
                            if (subtopic.tasks && Array.isArray(subtopic.tasks)) {
                                topic3Tasks[subtopicIndex] = [];
                                for (let taskIndex = 0; taskIndex < subtopic.tasks.length; taskIndex++) {
                                    if (taskIndex < 5) {
                                        const task = subtopic.tasks[taskIndex];
                                        const TaskComponent = require(`../newerModels/Task${1}${subtopicIndex + 1}${
                                            taskIndex + 1
                                        }`).default;
                                        topic3Tasks[subtopicIndex].push(
                                            <TaskComponent
                                                key={`Task${1}${subtopicIndex + 1}${taskIndex + 1}`}
                                                rotate={0}
                                                onClick={() => handleTaskIndexer(topicIndex, subtopicIndex, taskIndex)}
                                                progress={task.progress}
                                            />
                                        );
                                    }
                                }
                            }
                        });
                        setTopic3Tasks(topic3Tasks);
                    }
                    if (topicIndex === 3) {
                        topic.links.map((subtopic, subtopicIndex) => {
                            if (subtopic.tasks && Array.isArray(subtopic.tasks)) {
                                topic4Tasks[subtopicIndex] = [];
                                for (let taskIndex = 0; taskIndex < subtopic.tasks.length; taskIndex++) {
                                    if (taskIndex < 5) {
                                        const task = subtopic.tasks[taskIndex];
                                        const TaskComponent = require(`../newerModels/Task${1}${subtopicIndex + 1}${
                                            taskIndex + 1
                                        }`).default;
                                        topic4Tasks[subtopicIndex].push(
                                            <TaskComponent
                                                key={`Task${1}${subtopicIndex + 1}${taskIndex + 1}`}
                                                rotate={Math.PI}
                                                onClick={() => handleTaskIndexer(topicIndex, subtopicIndex, taskIndex)}
                                                progress={task.progress}
                                            />
                                        );
                                    }
                                }
                            }
                            setTopic4Tasks(topic4Tasks);
                        });
                    }
                    if (topicIndex === 4) {
                        topic.links.map((subtopic, subtopicIndex) => {
                            if (subtopic.tasks && Array.isArray(subtopic.tasks)) {
                                topic5Tasks[subtopicIndex] = [];
                                for (let taskIndex = 0; taskIndex < subtopic.tasks.length; taskIndex++) {
                                    if (taskIndex < 5) {
                                        const task = subtopic.tasks[taskIndex];
                                        const TaskComponent = require(`../newerModels/Task${1}${subtopicIndex + 1}${
                                            taskIndex + 1
                                        }`).default;
                                        topic5Tasks[subtopicIndex].push(
                                            <TaskComponent
                                                key={`Task${1}${subtopicIndex + 1}${taskIndex + 1}`}
                                                rotate={0}
                                                onClick={() => handleTaskIndexer(topicIndex, subtopicIndex, taskIndex)}
                                                progress={task.progress}
                                            />
                                        );
                                    }
                                }
                            }
                            setTopic5Tasks(topic5Tasks);
                        });
                    }
                });
            }

            if (props.mockdata[0].tasks.length === 1) {
                setSubTasks(
                    <>
                        <Tree11 />
                    </>
                );
            }
            if (props.mockdata[0].tasks.length === 2) {
                setSubTasks(
                    <>
                        <Tree11 /> <Tree12 />
                    </>
                );
            }
            if (props.mockdata[0].tasks.length === 3) {
                setSubTasks(
                    <>
                        <Tree11 /> <Tree12 />
                        <Tree14 />
                    </>
                );
            }
            if (props.mockdata[0].tasks.length === 4) {
                setSubTasks(
                    <>
                        <Tree11 /> <Tree12 />
                        <Tree13 /> <Tree14 />
                    </>
                );
            }
            setBranchOne(<Hook1 />);

            if (props.mockdata[0].links.length === 1) {
                // console.log(props.mockdata[0].links[0].label);
                setBranchOne(
                    <>
                        <Hook1 />
                        <Sub11 />
                    </>
                );
            }
            if (props.mockdata[0].links.length === 2) {
                setBranchOne(
                    <>
                        <Hook1 />
                        <Sub11 />
                        <Sub12 />
                    </>
                );
            }
            if (props.mockdata[0].links.length === 3) {
                setBranchOne(
                    <>
                        <Hook1 />
                        <Sub11 />
                        <Sub12 />
                        <Sub13 />
                    </>
                );
            }
            if (props.mockdata[0].links.length === 4) {
                setBranchOne(
                    <>
                        <Hook1 />
                        <Sub11 />
                        <Sub12 />
                        <Sub13 />
                        <Sub14 />
                    </>
                );
            }
            if (props.mockdata[0].links.length === 5) {
                setBranchOne(
                    <>
                        <Hook1 />
                        <Sub11 />
                        <Sub12 />
                        <Sub13 />
                        <Sub14 />
                        <Sub15 />
                    </>
                );
            }
        }
        if (props.mockdata.length === 2 || props.mockdata.length === 3 || props.mockdata.length === 4 || props.mockdata.length === 5) {
            if (props.mockdata[1].tasks.length === 1) {
                setSubTasks2(
                    <group position={[14, 0, 0]}>
                        <Tree11 />
                    </group>
                );
            }
            if (props.mockdata[1].tasks.length === 2) {
                setSubTasks2(
                    <>
                        <group position={[14, 0, 0]}>
                            <Tree11 /> <Tree12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].tasks.length === 3) {
                setSubTasks2(
                    <>
                        <group position={[14, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].tasks.length === 4) {
                setSubTasks2(
                    <>
                        <group position={[14, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree13 /> <Tree14 />
                        </group>
                    </>
                );
            }
            setBranchTwo(
                <>
                    <group position={[14, 0, 0]} rotation-x={Math.PI}>
                        <Hook1 />
                    </group>
                </>
            );
            if (props.mockdata[1].links.length === 1) {
                setBranchTwo(
                    <>
                        <group position={[14, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].links.length === 2) {
                setBranchTwo(
                    <>
                        <group position={[14, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].links.length === 3) {
                setBranchTwo(
                    <>
                        <group position={[14, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].links.length === 4) {
                setBranchTwo(
                    <>
                        <group position={[14, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[1].links.length === 5) {
                setBranchTwo(
                    <>
                        <group position={[14, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                            <Sub15 />
                        </group>
                    </>
                );
            }
        }
        if (props.mockdata.length === 3 || props.mockdata.length === 4 || props.mockdata.length === 5) {
            if (props.mockdata[2].tasks.length === 1) {
                setSubTasks3(
                    <group position={[27, 0, 0]}>
                        <Tree11 />
                    </group>
                );
            }
            if (props.mockdata[2].tasks.length === 2) {
                setSubTasks3(
                    <>
                        <group position={[27, 0, 0]}>
                            <Tree11 /> <Tree12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].tasks.length === 3) {
                setSubTasks3(
                    <>
                        <group position={[27, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].tasks.length === 4) {
                setSubTasks3(
                    <>
                        <group position={[27, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree13 /> <Tree14 />
                        </group>
                    </>
                );
            }
            setBranchThree(
                <>
                    <group position={[27, 0, 0]}>
                        <Hook1 />
                    </group>
                </>
            );
            if (props.mockdata[2].links.length === 1) {
                setBranchThree(
                    <>
                        <group position={[27, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].links.length === 2) {
                setBranchThree(
                    <>
                        <group position={[27, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].links.length === 3) {
                setBranchThree(
                    <>
                        <group position={[27, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].links.length === 4) {
                setBranchThree(
                    <>
                        <group position={[27, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[2].links.length === 5) {
                setBranchThree(
                    <>
                        <group position={[27, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                            <Sub15 />
                        </group>
                    </>
                );
            }
        }
        if (props.mockdata.length === 4 || props.mockdata.length === 5) {
            if (props.mockdata[3].tasks.length === 1) {
                setSubTasks4(
                    <group position={[40, 0, 0]}>
                        <Tree11 />
                    </group>
                );
            }
            if (props.mockdata[3].tasks.length === 2) {
                setSubTasks4(
                    <>
                        <group position={[40, 0, 0]}>
                            <Tree11 /> <Tree12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].tasks.length === 3) {
                setSubTasks4(
                    <>
                        <group position={[40, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].tasks.length === 4) {
                setSubTasks4(
                    <>
                        <group position={[40, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree13 /> <Tree14 />
                        </group>
                    </>
                );
            }
            setBranchFour(
                <>
                    <group position={[40, 0, 0]} rotation-x={Math.PI}>
                        <Hook1 />
                    </group>
                </>
            );
            if (props.mockdata[3].links.length === 1) {
                setBranchFour(
                    <>
                        <group position={[40, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].links.length === 2) {
                setBranchFour(
                    <>
                        <group position={[40, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].links.length === 3) {
                setBranchFour(
                    <>
                        <group position={[40, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].links.length === 4) {
                setBranchFour(
                    <>
                        <group position={[40, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[3].links.length === 5) {
                setBranchFour(
                    <>
                        <group position={[40, 0, 0]} rotation-x={Math.PI}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                            <Sub15 />
                        </group>
                    </>
                );
            }
        }
        if (props.mockdata.length === 5) {
            if (props.mockdata[4].tasks.length === 1) {
                setSubTasks5(
                    <group position={[53.5, 0, 0]}>
                        <Tree11 />
                    </group>
                );
            }
            if (props.mockdata[4].tasks.length === 2) {
                setSubTasks5(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Tree11 /> <Tree12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].tasks.length === 3) {
                setSubTasks5(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].tasks.length === 4) {
                setSubTasks5(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Tree11 /> <Tree12 />
                            <Tree13 /> <Tree14 />
                        </group>
                    </>
                );
            }
            setBranchFive(
                <>
                    <group position={[53.5, 0, 0]}>
                        <Hook1 />
                    </group>
                </>
            );
            if (props.mockdata[4].links.length === 1) {
                setBranchFive(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].links.length === 2) {
                setBranchFive(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].links.length === 3) {
                setBranchFive(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].links.length === 4) {
                setBranchFive(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                        </group>
                    </>
                );
            }
            if (props.mockdata[4].links.length === 5) {
                setBranchFive(
                    <>
                        <group position={[53.5, 0, 0]}>
                            <Hook1 />
                            <Sub11 />
                            <Sub12 />
                            <Sub13 />
                            <Sub14 />
                            <Sub15 />
                        </group>
                    </>
                );
            }
        }
    }, [props.mockdata]);

    const dummyRef = useRef();
    let vec = new THREE.Vector3();

    // useFrame((state, delta) => {
    //   if (isMoving) {
    //     gsap.to(dummyRef.current.position, {
    //       x: targetPosition[0],
    //       y: targetPosition[1],
    //       z: targetPosition[2],
    //       duration: 2,
    //     });
    //     gsap.to(state.camera.position, {
    //       x: dummyRef.current.position.x + 15,
    //       y: dummyRef.current.position.y + 15.5,
    //       z: dummyRef.current.position.z + 15,
    //       duration: 2,
    //     });
    //     setIsMoving(false);
    //   }
    //   state.camera.lookAt(dummyRef.current.position);
    // });

    const [allText, setAllText] = useState([]);

    useEffect(() => {
        let newText = [];
        props.mockdata.forEach((topic, topicIndex) => {
            newText.push(
                <DreiText
                    position={[topicIndex > 1 ? 4 * topicIndex - 3.1 : 4.2 * topicIndex - 3.1, -1.84, topicIndex % 2 === 0 ? -1 : 1]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    color={'black'}
                    fontSize={0.3}
                >
                    {topic.label}
                </DreiText>
            );
            topic.links.forEach((link, linkIndex) => {
                newText.push(
                    <DreiText
                        rotation-x={-Math.PI / 2}
                        position={[
                            linkIndex % 2 === 0 ? 4 * topicIndex - 1.75 : 4 * topicIndex - 4.25,
                            -1.84,
                            topicIndex % 2 === 0 ? -2.35 * linkIndex * 0.91 - 2.35 : 2.35 * linkIndex * 0.91 + 2.35
                        ]}
                        fontSize={0.3}
                    >
                        {link.label}
                    </DreiText>
                );
                link.tasks?.forEach((task, taskIndex) => {
                    newText.push(
                        linkIndex === 0 && (
                            <group position={[topicIndex === 1 ? 3.7 : topicIndex === 3 ? 10.5 : 0, topicIndex % 2 !== 0 ? -3.7 : 0, 0]}>
                                <group
                                    position={[topicIndex % 2 === 0 ? topicIndex * 4.1 : topicIndex * 0.5, 0, 0]}
                                    // visible={topicIndex % 2 === 0}
                                    rotation={[0, topicIndex % 2 !== 0 ? Math.PI : 0, topicIndex % 2 !== 0 ? Math.PI : 0]}
                                >
                                    <DreiText
                                        rotation-x={topicIndex % 2 !== 0 ? Math.PI / 2 : -Math.PI / 2}
                                        position={[
                                            taskIndex === 4
                                                ? -0.1
                                                : taskIndex < 2
                                                ? -2.4 * (-taskIndex / 2.5) - 2.4
                                                : taskIndex === 2
                                                ? -2.4 * (-(taskIndex - 1) / 2.5) - 2.4
                                                : taskIndex === 3
                                                ? -2.4 * (-(taskIndex - 3) / 2.5) - 2.4
                                                : -2.4 * (-(taskIndex - 2) / 2.5) - 2.4,
                                            -1.84,
                                            taskIndex === 4 ? -2.9 : taskIndex < 2 ? -1.3 : -3.6
                                        ]}
                                        fontSize={0.2}
                                    >
                                        {task.label}
                                    </DreiText>
                                </group>
                            </group>
                        ),
                        linkIndex === 1 && (
                            <group position={[topicIndex === 1 ? 3.7 : topicIndex === 3 ? 10.5 : 0, topicIndex % 2 !== 0 ? -3.7 : 0, 0]}>
                                <group
                                    // visible={topicIndex % 2 === 0}
                                    position={[topicIndex % 2 === 0 ? topicIndex * 4.1 : topicIndex * 0.5, 0, 0]}
                                    rotation={[0, topicIndex % 2 !== 0 ? Math.PI : 0, topicIndex % 2 !== 0 ? Math.PI : 0]}
                                >
                                    <DreiText
                                        rotation-x={topicIndex % 2 !== 0 ? Math.PI / 2 : -Math.PI / 2}
                                        position={[
                                            taskIndex === 4
                                                ? -3.8 * ((taskIndex - 2) / 3.7) - 4.2
                                                : taskIndex < 2
                                                ? -3.8 * (taskIndex / 3.7) - 3.8
                                                : taskIndex === 2
                                                ? -3.8 * ((taskIndex - 1) / 3.7) - 3.8
                                                : taskIndex === 3
                                                ? -3.8 * ((taskIndex - 3) / 3.7) - 3.8
                                                : -3.8 * ((taskIndex - 2) / 3.7) - 3.8,
                                            -1.84,
                                            taskIndex === 4 ? -5 : taskIndex < 2 ? -3.5 : -5.6
                                        ]}
                                        fontSize={0.2}
                                    >
                                        {task.label}
                                    </DreiText>
                                </group>
                            </group>
                        ),
                        linkIndex === 2 && (
                            <group position={[topicIndex === 1 ? 3.7 : topicIndex === 3 ? 10.5 : 0, topicIndex % 2 !== 0 ? -3.7 : 0, 0]}>
                                <group
                                    // visible={topicIndex % 2 === 0}
                                    position={[topicIndex % 2 === 0 ? topicIndex * 4.1 : topicIndex * 0.5, 0, 0]}
                                    rotation={[0, topicIndex % 2 !== 0 ? Math.PI : 0, topicIndex % 2 !== 0 ? Math.PI : 0]}
                                >
                                    <DreiText
                                        rotation-x={topicIndex % 2 !== 0 ? Math.PI / 2 : -Math.PI / 2}
                                        position={[
                                            taskIndex === 4
                                                ? -0.1
                                                : taskIndex < 2
                                                ? -2.4 * (-taskIndex / 2.5) - 2.4
                                                : taskIndex === 2
                                                ? -2.4 * (-(taskIndex - 1) / 2.5) - 2.4
                                                : taskIndex === 3
                                                ? -2.4 * (-(taskIndex - 3) / 2.5) - 2.4
                                                : -2.4 * (-(taskIndex - 2) / 2.5) - 2.4,
                                            -1.84,
                                            taskIndex === 4 ? -7.2 : taskIndex < 2 ? -5.5 : -7.8
                                        ]}
                                        fontSize={0.2}
                                    >
                                        {task.label}
                                    </DreiText>
                                </group>
                            </group>
                        ),
                        linkIndex === 3 && (
                            <group position={[topicIndex === 1 ? 3.7 : topicIndex === 3 ? 10.5 : 0, topicIndex % 2 !== 0 ? -3.7 : 0, 0]}>
                                <group
                                    // visible={topicIndex % 2 === 0}
                                    position={[topicIndex % 2 === 0 ? topicIndex * 4.1 : topicIndex * 0.5, 0, 0]}
                                    rotation={[0, topicIndex % 2 !== 0 ? Math.PI : 0, topicIndex % 2 !== 0 ? Math.PI : 0]}
                                >
                                    <DreiText
                                        rotation-x={topicIndex % 2 !== 0 ? Math.PI / 2 : -Math.PI / 2}
                                        position={[
                                            taskIndex === 4
                                                ? -3.8 * ((taskIndex - 2) / 3.7) - 4.2
                                                : taskIndex < 2
                                                ? -3.8 * (taskIndex / 3.7) - 3.8
                                                : taskIndex === 2
                                                ? -3.8 * ((taskIndex - 1) / 3.7) - 3.8
                                                : taskIndex === 3
                                                ? -3.8 * ((taskIndex - 3) / 3.7) - 3.8
                                                : -3.8 * ((taskIndex - 2) / 3.7) - 3.8,
                                            -1.84,
                                            taskIndex === 4 ? -9.25 : taskIndex < 2 ? -7.7 : -9.85
                                        ]}
                                        fontSize={0.2}
                                    >
                                        {task.label}
                                    </DreiText>
                                </group>
                            </group>
                        ),
                        linkIndex === 4 && (
                            <group position={[topicIndex === 1 ? 3.7 : topicIndex === 3 ? 10.5 : 0, topicIndex % 2 !== 0 ? -3.7 : 0, 0]}>
                                <group
                                    // visible={topicIndex % 2 === 0}
                                    position={[topicIndex % 2 === 0 ? topicIndex * 4.1 : topicIndex * 0.5, 0, 0]}
                                    rotation={[0, topicIndex % 2 !== 0 ? Math.PI : 0, topicIndex % 2 !== 0 ? Math.PI : 0]}
                                >
                                    <DreiText
                                        rotation-x={topicIndex % 2 !== 0 ? Math.PI / 2 : -Math.PI / 2}
                                        position={[
                                            taskIndex === 4
                                                ? -0.1
                                                : taskIndex < 2
                                                ? -2.4 * (-taskIndex / 2.5) - 2.4
                                                : taskIndex === 2
                                                ? -2.4 * (-(taskIndex - 1) / 2.5) - 2.4
                                                : taskIndex === 3
                                                ? -2.4 * (-(taskIndex - 3) / 2.5) - 2.4
                                                : -2.4 * (-(taskIndex - 2) / 2.5) - 2.4,
                                            -1.84,
                                            taskIndex === 4 ? -11.3 : taskIndex < 2 ? -9.8 : -11.9
                                        ]}
                                        fontSize={0.2}
                                    >
                                        {task.label}
                                    </DreiText>
                                </group>
                            </group>
                        )
                    );
                });
            });
            topic.tasks.forEach((task, taskIndex) => {
                newText.push(
                    <DreiText
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        position={[
                            taskIndex < 2 ? taskIndex * 2 - 4 * (-topicIndex + 1) : (taskIndex - 2) * 2 - 4 * (-topicIndex + 1),
                            -1.84,
                            taskIndex < 2 ? -0.55 : 0.55
                        ]}
                        fontSize={0.2}
                    >
                        {task.label}
                    </DreiText>
                );
            });
        });

        setAllText(allText.concat(newText));
    }, [props.mockdata]);
    return (
        <>
            {allText}

            <group position={[-7, -1.85, 0]} scale={0.3}>
                <Waterfall />
                {branchOne}
                {branchTwo}
                {branchThree}
                {branchFour}
                {branchFive}
                {subTasks}
                {subTasks2}
                {subTasks3}
                {subTasks4}
                {subTasks5}
                {/* <group scale-y={5}>
            {Object.keys(subsubTasks).map(
              (subtopicIndex) => subsubTasks[subtopicIndex]
            )}
          </group> */}
                <group scale-y={5}>{Object.keys(topic1Tasks).map((subtopicIndex) => topic1Tasks[subtopicIndex])}</group>
                <group scale-y={5} rotation={[Math.PI, 0, 0]} position={[14, 0, 0]}>
                    {Object.keys(topic2Tasks).map((subtopicIndex) => topic2Tasks[subtopicIndex])}
                </group>
                <group scale-y={5} position={[27, 0, 0]}>
                    {Object.keys(topic3Tasks).map((subtopicIndex) => topic3Tasks[subtopicIndex])}
                </group>
                <group scale-y={5} rotation={[Math.PI, 0, 0]} position={[40, 0, 0]}>
                    {Object.keys(topic4Tasks).map((subtopicIndex) => topic4Tasks[subtopicIndex])}
                </group>
                <group scale-y={5} position={[54, 0, 0]}>
                    {Object.keys(topic5Tasks).map((subtopicIndex) => topic5Tasks[subtopicIndex])}
                </group>
            </group>
            {/* {waterfalls} */}
            <mesh ref={dummyRef}>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshBasicMaterial transparent opacity={0} attach="material" color="black" />
            </mesh>
            <pointLight position={[0, 10, 0]} intensity={1} />
            <Grid
                renderOrder={-1}
                position={[0, -1.85, 0]}
                infiniteGrid={true}
                cellSize={0.5}
                cellThickness={0.6}
                sectionSize={2}
                sectionThickness={1.5}
                sectionColor={[0.5, 0.5, 10]}
                fadeDistance={80}
            />
            <OrbitControls enablePan={true} zoomSpeed={0.3} rotateSpeed={0.4} maxPolarAngle={Math.PI / 2} />
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={2} mipmapBlur />
            </EffectComposer>
            <Environment background preset="sunset" blur={0.8} />
        </>
    );
}