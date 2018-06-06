---
layout: default
title: "JanusGraph: Distributed graph database"
---

<center>
  <a href="http://docs.janusgraph.org/latest/">Docs</a> &bull;
  <a href="https://github.com/JanusGraph/janusgraph/">GitHub</a> &bull;
  <a href="https://github.com/JanusGraph/janusgraph/releases/">Download</a><br />
  <img class="janusgraph" src="images/janusgraph.png" />
</center>

JanusGraph is a scalable [graph
database](http://en.wikipedia.org/wiki/Graph_database) optimized for storing and
querying graphs containing hundreds of billions of vertices and edges
distributed across a multi-machine cluster. JanusGraph is a transactional
database that can support thousands of concurrent users executing complex graph
traversals in real time.

In addition, JanusGraph provides the following features:

* Elastic and linear scalability for a growing data and user base.
* Data distribution and replication for performance and fault tolerance.
* Multi-datacenter high availability and hot backups.
* Support for [ACID](http://en.wikipedia.org/wiki/ACID) and
  [eventual consistency](http://en.wikipedia.org/wiki/Eventual_consistency).
* Support for various storage backends:
  * [Apache Cassandra®](http://cassandra.apache.org)
  * [Apache HBase®](http://hbase.apache.org)
  * [Google Cloud Bigtable](https://cloud.google.com/bigtable)
  * [Oracle BerkeleyDB](http://www.oracle.com/technetwork/database/berkeleydb/overview/index-093405.html)
* Support for global [graph data analytics](http://tinkerpop.apache.org/docs/3.2.4/reference/#graphcomputer), reporting, and ETL through integration with big data
  platforms:
  * [Apache Spark™](http://spark.apache.org)
  * [Apache Giraph™](http://giraph.apache.org)
  * [Apache Hadoop®](http://hadoop.apache.org)
* Support for geo, numeric range, and full-text search via:
  * [ElasticSearch™](http://www.elasticsearch.org)
  * [Apache Solr™](http://lucene.apache.org/solr)
  * [Apache Lucene®](http://lucene.apache.org)
* Native integration with the [Apache TinkerPop™](http://tinkerpop.apache.org) graph stack:
  * [Gremlin graph query language](http://tinkerpop.apache.org/docs/3.2.4/reference/#traversal)
  * [Gremlin graph server](http://tinkerpop.apache.org/docs/3.2.4/reference/#gremlin-server)
  * [Gremlin applications](http://tinkerpop.apache.org/docs/3.2.4/reference/#gremlin-applications)
* Open source under the [Apache 2](http://www.apache.org/licenses/LICENSE-2.0.html) license.
* You can visualize graphs stored in JanusGraph via any of the following tools:
  * [Cytoscape](http://www.cytoscape.org/)
  * [Gephi](http://tinkerpop.apache.org/docs/current/reference/#gephi-plugin)
    plugin for Apache TinkerPop
  * [Graphexp](https://github.com/bricaud/graphexp)
  * [KeyLines by Cambridge Intelligence](https://cambridge-intelligence.com/visualizing-janusgraph-new-titandb-fork/)
  * [Linkurious](https://doc.linkurio.us/ogma/latest/tutorials/janusgraph/)

You can [download](https://github.com/JanusGraph/janusgraph/releases) JanusGraph
or [clone](https://github.com/JanusGraph/janusgraph) from GitHub.

Read the [JanusGraph documentation](http://docs.janusgraph.org/latest) and join the
[users](https://groups.google.com/group/janusgraph-users) or
[developers](https://groups.google.com/group/janusgraph-dev) mailing lists.

Follow the [Getting Started with JanusGraph](http://docs.janusgraph.org/latest/getting-started.html) guide for a step-by-step introduction.

## <a name="about"></a>About

JanusGraph is a project under [The Linux
Foundation](https://www.linux.com/blog/Linux-Foundation-welcomes-JanusGraph),
and includes participants from Expero, Google, GRAKN.AI, Hortonworks, IBM and Amazon.

## Presentations
Here is a selection of JanusGraph presentations:

* [DataWorksJun2017: Large Scale Graph Analytics with JanusGraph](https://www.slideshare.net/ptgoetz/large-scale-graph-analytics-with-janusgraph), P. Taylor Goetz, 2017.06.13

* [HBaseCon2017 Community-Driven Graphs with JanusGraph](https://www.slideshare.net/HBaseCon/communitydriven-graphs-with-janusgraph-77117443), Jing Chen He & Jason Plurad, 2017.06.12

## <a name="users"></a>Users

The following users have deployed JanusGraph in production.

<a href="https://www.celum.com/en/graph-driven-and-reactive-architecture" class="logo"><img src="images/logos/celum.png" alt="celum" class="logo" style="width: 150px"></a>
<a href="https://www.compose.com/databases/janusgraph" class="logo"><img src="images/logos/compose.png" alt="Compose" class="logo"></a>
<a href="https://finc.com" class="logo"><img src="images/logos/finc.png" alt="FiNC" class="logo"></a>
<a href="https://gdatasoftware.com" class="logo"><img src="images/logos/gdata.png" alt="G DATA" class="logo" style="width: 100px"></a>
<a href="http://denmarkblog.timesinternet.in/blogs/graph/times-internet-is-using-janusgraph-as-main-database-in-cms-for-all-newsrooms/articleshow/63709837.cms" class="logo"><img src="images/logos/timesinternet.png" alt="Times Internet" class="logo" style="width: 250px"></a>
