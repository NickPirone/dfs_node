# dfs_node
building a prototype distributed file system in node.js

This program is broken up into really three components:
a.  the main application, which provides the common interfaces for uploading files and asking for functions to be performed on the files.
b.  the 'controller' => provides functionality for splicing files, mapping files to servers, mapping jobs to servers, and providing the general Map/Reduce framework.
c.  the dfs servers--individually assigned nodes that are given files.  they accept jobs to run directed at files they contain, and when finished return their results to the 'controller'.

<pre>
	1.  insertion  
	2.  access  
	3.  search  
	4.  removal  
	5.  size querying  
	6.  clearing  
</pre>


Prerequisites:
	Node.js installed on your system and in path.
	formiddable pacakage installed with node ($npm install formidable')

To download and run this project on your local machine, please clone the git repository and run the script "start.sh".  If you get an access denied error, change the permission on the script file:  using a shell (or terminal), navigate to the folder containing the script and type:

		chmod u+x start.sh  
		
this will tell the OS that the script is executable and that you have permission to execute.




Where does this code start?  The entrypoint for this is start.sh.  Please examine the start.sh file for comments on what it is doing and why:

		node main.js #call the main method
	


