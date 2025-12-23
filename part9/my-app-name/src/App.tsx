interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return ( 
    <>
      <h1>{props.title}</h1>
    </>
  );
}

interface CoursePartBase {
  name: string,
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

interface PartProps {
  part: CoursePart
}

interface ContentProps {
  courseParts: CoursePart[]
}

const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const showBase = (name: string, exerciseCount: number) => {
    return (
      <>
        <b>{name} {exerciseCount}</b>
      </>
    );
  }

  const showDescription = (description: string) => {
    return (
      <>
        <i>{description}</i>
      </>
    );
  }

  const showGroupProjects = (groupProjectCount: number) => {
    return (
      <>
        project exercises {groupProjectCount}
      </>
    );
  }

  const showBackground = (backgroundMaterial: string) => {
    return (
      <>
        submit to {backgroundMaterial}
      </>
    );
  }

  const showRequirements = (requirements: string[]) => {
    return (
      <>
        required skills: {requirements.join(', ')}
      </>
    )
  }

  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          {showBase(props.part.name, props.part.exerciseCount)}
          <br />  
          {showDescription(props.part.description)}
        </p>
      );
    case "group":
      return (
        <p>
          {showBase(props.part.name, props.part.exerciseCount)}
          <br />  
          {showGroupProjects(props.part.groupProjectCount)}
        </p>
      );
    case "background":
      return (
        <p>
          {showBase(props.part.name, props.part.exerciseCount)}
          <br />  
          {showBackground(props.part.backgroundMaterial)}
        </p>
      );
    case "special":
      return (
        <p>
          {showBase(props.part.name, props.part.exerciseCount)}
          <br />  
          {showDescription(props.part.description)}
          <br />  
          {showRequirements(props.part.requirements)}
        </p>
      )
    default:
      return assertNever(props.part)
  }
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((elem, index) => (
        <Part key={index} part={elem} />
      ))}
    </>
  );
}

interface TotalProps {
  totalExercises: number
}

const Total = (props: TotalProps) => {
  return (
    <>
      <p>
        Number of exercises {props.totalExercises}
      </p>
    </>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
