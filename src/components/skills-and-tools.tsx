import Image from "next/image";

const skillGroups = [
  {
    title: "Coding",
    skills: [
      { name: "WordPress", icon: "wordpress" },
      { name: "HTML5", icon: "html5" },
      { name: "JavaScript", icon: "javascript" },
      { name: "CSS3", icon: "css3" },
      { name: "Flutter", icon: "flutter" },
      { name: "Next.js", icon: "nextjs" },
    ],
  },
  {
    title: "Design Tools",
    skills: [
      { name: "Photoshop", icon: "photoshop" },
      { name: "Illustrator", icon: "illustrator" },
      { name: "Figma", icon: "figma" },
      { name: "Canva", icon: "canva" },
    ],
  },
  {
    title: "Video Editing",
    skills: [
      { name: "Premiere Pro", icon: "premierepro" },
      { name: "After Effects", icon: "aftereffects" },
      { name: "CapCut", icon: "capcut" },
    ],
  },
];

export function SkillsAndTools() {
  return (
    <div className="skills-tools" role="group" aria-label="Skills and creative tools">
      {skillGroups.map((group) => (
        <div className="skills-group" key={group.title}>
          <h3>{group.title}</h3>
          <ul aria-label={group.title}>
            {group.skills.map((skill) => (
              <li key={skill.icon} title={skill.name}>
                <Image
                  src={`/icons/skills/${skill.icon}.svg`}
                  alt=""
                  width={36}
                  height={36}
                />
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
