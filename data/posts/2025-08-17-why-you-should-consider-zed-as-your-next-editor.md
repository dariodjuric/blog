---
title: Why you should consider Zed as your next editor
tags: ['Editors']
summary: Zed is a fantastic editor that is becoming the go-to choice for many developers.
---

I've been following [Zed](https://zed.dev/) for a while now, ever since it became open-source in early 2024. Occasionally I'd use it as a plain text editor, until sometime this year, they shipped support for Git as well as a powerful agent sidebar which is almost on par with Cursor's. Then, I decided to use it for most of my coding, replacing [Cursor](https://cursor.com/).

While feature-wise it's still not on the level of Cursor and VS Code, I think now is the time you should consider using it as your next editor or even re-consider if you've tried it before. Here are some of the reasons why:

### Simplistic, fast user interface

It's no secret that Zed is blazing fast. Probably one of the fastest text editors out there. With the editor being written in Rust in its entirety, Zed is designed with maximum responsiveness and minimal resource usage in mind. Opening projects feels instantaneous, even with large codebases.

The user interface is so simplistic and beautiful. For a long period of time, I was a heavy user of JetBrains products. Still am, occasionally. What JetBrains IDEs get right in my opinion is that their interfaces don't feel that overwhelming. They are still packed with features, but they don't feel cluttered or intrusive, and they let me have maximum focus on the code. That's how I feel about Zed. It has the aesthetic of JetBrains IDEs, without feeling slow.

### AI features built into the core of the product

Whether you are an AI optimist, pessimist, or somewhere in between, you cannot deny that AI-assisted development has revolutionized how we feel about writing code. Cursor has been a pioneer in this space, and they've introduced some really good innovations, such as the AI-assisted multi-line edit prediction and the agent sidebar. The multi-line edit prediction in particular is what got me converted over to Cursor in the first place. Other editors are now also implementing the same features.

However, in my view, AI-assisted development in many other IDEs and editors still feels like it's not fully polished, and that the AI features have been stitched on top of the existing editor. I am still experiencing issues in PHPStorm, for example, where the code just gets downright broken after a change by the editor's agent. Like, half of the file just gets deleted or replaced with gibberish.

With Zed, I did not have that experience. It feels like the AI features were built into the core of the product as the product was being architected, and they work seamlessly with the editor. The agent sidebar works great, and I particularly like the experience of edit prediction. The Zed team did not choose to overload the tab key with both the standard auto-complete and edit-prediction. Rather, they chose to use a modifier key (Opt on Mac) if you want to use the edit prediction as opposed to the standard auto-complete.

Last but not least, Zed is very friendly to other agents' rules files. If you work in a team that uses multiple agents and your project includes `.cursorrules`, `.github/copilot-instructions.md`, `CLAUDE.md`, etc., Zed will take [all of them into consideration](https://zed.dev/docs/ai/rules).

### Great team that ships fast

I'm in no way associated with Zed's team, but I feel at this point they have a great team that ships really fast. In just 6 months, they managed to ship a fully working Git integration and the agent panel. They are also pretty transparent about their work. I loved their [recent video](https://www.youtube.com/watch?v=r1A268kA1uM) where they explain how they built the edit prediction feature.

Even though Zed doesn't have a large number of features like VS Code, with the speed that they ship, I feel they will be able to catch up with the rest of the editor market in the coming years.

### Native real-time collaboration

Native real-time collaboration is another of those features that other editors have implemented as an add-on, whereas in Zed it's central to the entire editor. Real-time collaboration is a feature that allows multiple users to work on the same file simultaneously, with changes being synced in real-time. Think Google Docs, but for coding.

### And much more...

Zed really has many great features, but I tried to highlight some of the ones I like the most and that really stand out from other editors. Even if that doesn't make you want to switch, I hope you at least consider giving it a try. It's a great editor, and I think you'll enjoy using it.
