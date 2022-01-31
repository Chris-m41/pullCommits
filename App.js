import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Octokit } from 'octokit';

export const RetrieveCommits = () => {
  const [commits, setCommits] = useState([]);
  const octokit = new Octokit({ auth: 'AUTH KEY GOES HERE' }); 

  const getCommits = useCallback(async () => {
    const owner = 'facebook';
    const repo = 'react-native';
    const per_page = 25;

    const getCommits = await octokit.request(
        `GET /repos/{owner}/{repo}/commits`, { owner, repo, per_page }
      );

    setCommits(getCommits);
  }, []);

  useEffect(() => {
    getCommits()
      .catch(console.error);
  }, [getCommits]);

  const renderItem = (item) => {
    return (
      <View style={{
        backgroundColor: item.index % 2 === 0 ? '#ccc' : '#fff',
        borderWidth: 1,
        flexDirection: 'column',
      }}>
        <Text style={styles.item}>Username: {item?.item?.author?.login}</Text>
        <Text numberOfLines={1} style={styles.item}>Hash: {item?.item?.sha}</Text>
        <Text numberOfLines={1} style={styles.item}>Message: {item?.item?.commit?.message}</Text>
      </View>
    )
  }

  return (
    <FlatList
        data={commits.data}
        renderItem={renderItem}
      />
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>25 Latest pulls for React Native</Text>
      <RetrieveCommits />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 2,
    color: '#373f51',
  },
});

export default App;
