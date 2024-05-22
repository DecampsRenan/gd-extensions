## Custom Cursor - v1.0.0

> Replace the system cursor with a custom sprite animation.

## How to use it

### TLDR;

Add the behavior to a sprite object. The sprite object must meet the following criteria:

- Have at least one animation (name it "idle"; see below to know how to use a custom name)
- Origin point should be placed where you intend the user to click. It allow the behavior to correctly place the sprite (the location you use to click with the sprite should match the location used to click with the system cursor)

| Do                                           | Don't                                              |
| -------------------------------------------- | -------------------------------------------------- |
| ![Do place origin](./assets/Do%20origin.png) | ![Don't place origin](./assets/Don't%20origin.png) |

- **Optional** The center point allow you to rotate the sprite around where you are supposed to click (the tip of your system cursor). Usefull when you want to rotate your sprite in the editor

| Do                                               | Don't                                                  |
| ------------------------------------------------ | ------------------------------------------------------ |
| ![Do place rotation](./assets/Do%20rotation.png) | ![Don't place rotation](./assets/Don't%20rotation.png) |

### Customize behavior

#### Add an animation that will be played when the user is pressing the right click

- Enable the "Has pressed state" checkbox on the behavior settings
- By default, the behavior will search for a "pressed" animation

#### Use another animation name

- Override animation names used for idle and pressed in the behavior settings, under Idle Animation Name and Pressed Animation Name.
