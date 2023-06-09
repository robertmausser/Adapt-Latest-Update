# adapt-side-menu  

**Side Menu** is a *menu* bundled with the [Adapt framework](https://github.com/aniketdharia/adapt_framework).  

<img src="https://github.com/aniketdharia/documentation/blob/master/04_wiki_assets/snuggery/sidemenu.png" alt="A half window side menu">

Menu choices are framed within a box element and arranged in a grid and placed on half side of window. **Side Menu** allows you to direct the learner to either further menus (sub menus) or to one or more pages of content. The **Side Menu** default is show a title, an image, some body text, duration, a progress indicator and a link button.

[Visit the **Side Menu** wiki](https://github.com/aniketdharia/adapt-side-menu/wiki) for more information about its functionality and for explanations of key properties. Options include an estimated time for completion (duration) and a progress bar to indicate the percentage of components that have been completed.

##Installation

**Side Menu** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation).

* If **Side Menu** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-side-menu`

##Uninstallation  
The Adapt framework does not allow the installation of more than one menu at a time. In order to replace **Side Menu** it must be uninstalled. With the root of your framework installation as your current working directory, run the following command:  
`adapt uninstall adapt-side-menu`  

<div float align=right><a href="#top">Back to Top</a></div>

## Settings Overview

The attributes listed below are used in *contentObjects.json* to configure **Side Menu**, and are properly formatted as JSON in [*example.json*](https://github.com/aniketdharia/adapt-side-menu/blob/master/example.json).

### Attributes

**_id** (string): This is a unique identifier that establishes relationships with other content structures. It is referenced in *articles.json* as the `_parentid` of an article model.   

**_parentId** (string): This value is sourced from the parent element's `_id` found within *course.json*. It must match.

**_type** (string): This value determines what the learner will access by clicking the provided link/button. Acceptable values are `"page"` and `"menu"`. `"page"` will direct the learner to a page structured with articles, blocks, and components. `"menu"` will direct the learner to a page with more menus.

**_classes** (string): CSS class name to be applied to menu item's `page` element (*src/core/js/views/pageView.js*). The class must be predefined in one of the Less files. Separate multiple classes with a space.

**title** (string): This text is a reference title for the content object.

**displayTitle** (string):  This text is displayed on the menu item.

**body** (string):  Optional text that appears on the menu item. Often used to inform the learner about the menu choice. If no **pageBody** is supplied, this text will also appear as the body text of the page header.

**pageBody** (string): Optional text that appears as the body text of the page header. If this text is not provided, the **body** text will be used (if it is supplied). Reference [*adapt-default-theme/templates/page.hbs*](https://github.com/aniketdharia/adapt-default-theme/blob/master/templates/page.hbs).

**_graphic** (object): The image that appears on the menu item. It contains values for **alt** and **src**.

>**alt** (string): This text becomes the image’s `alt` attribute.

>**src** (string): File name (including path) of the image. Path should be relative to the *src* folder (e.g., *"course/en/images/graphic-1.jpg"*).  

**linkText** (string): This text is displayed on the menu item's link/button.  

**durationLabel** (string): Optional text which precedes **duration** (e.g., `"Duration:"`).  

**duration** (string): Optional text which follows **durationLabel** (e.g., `"2 mins"`).  

<div float align=right><a href="#top">Back to Top</a></div>  

### Accessibility
Several menu-related elements are assigned a label using the [aria-label](https://github.com/aniketdharia/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**, **menuItem**, and **menuEnd**. These labels are not visible elements. They are utilized by assistive technology such as screen readers. Should the label texts need to be customised, they can be found within the **globals** object in [*properties.schema*](https://github.com/aniketdharia/adapt-side-menu/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.  

----------------------------
**Version number:**  1.0.0   <a href="https://snuggery.vyassystems.com/" target="_blank"><img src="https://github.com/aniketdharia/documentation/blob/master/04_wiki_assets/snuggery/snuggery-logo.png" alt="adapt learning logo" align="right"></a>
**Framework versions:**  2.0     
**Author / maintainer:** Snuggery Core Team with [contributors](https://github.com/aniketdharia/adapt-side-menu/graphs/contributors)  
**Accessibility support:** WAI AA   
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge 12, IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 8+9), Safari for iPad (iOS 8+9), Safari 8, Opera
