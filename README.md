# dfs_node
building a prototype distributed file system in node.js

This program is broken up into really three components:

1.  The main application, which provides the common interfaces for uploading files and asking for functions to be performed on the files.
2.  The 'controller' => provides functionality for splicing files, mapping files to servers, mapping jobs to servers, and providing the general Map/Reduce framework.
3.  The dfs servers--individually assigned nodes that are given files.  they accept jobs to run directed at files they contain, and when finished return their results to the 'controller'.


Prerequisites:
	Node.js installed on your system and in path.
	

To download and run this project on your local machine, please clone the git repository and run the script "start.sh".  If you get an access denied error, change the permission on the script file:  using a shell (or terminal), navigate to the folder containing the script and type:

		chmod u+x start.sh  
		
this will tell the OS that the script is executable and that you have permission to execute.  You may also have to do the same for the clear.sh script, which is invoked by start.sh.




Where does this code start?  The entrypoint for this is start.sh.  This script will:

1.  clear all previous information from the working directory.  As you upload files, the directories will reflect what is known about on each 'server'.
2.  Start 4 instances of node:  1 for the main server, and 3 for the children (who perform the jobs).
